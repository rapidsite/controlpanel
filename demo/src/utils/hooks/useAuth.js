import { useSelector, useDispatch } from 'react-redux'
import { setUser, initialState } from 'store/auth/userSlice'
import { apiSignIn, apiSignOut, apiSignUp } from 'services/AuthService'
import { onSignInSuccess, onSignOutSuccess } from 'store/auth/sessionSlice'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://havlxegijmnxtdwjvxdv.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhdmx4ZWdpam1ueHRkd2p2eGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwODU3NzUsImV4cCI6MTk5ODY2MTc3NX0.YWbnSVFmSt9KSnGRxYommvTb2JZWat0hR3HvXzU-oLc')



function useAuth() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const signIn = async (values) => {
            const { resp, error } = await supabase.auth.signInWithPassword({
                email: values.userName,
                password: values.password,
              })
              const { token, signedIn } = (await supabase.auth.getSession()).data.session.access_token
            if ((await supabase.auth.getSession()).data.session) {
                const { data, error } = await supabase.from('admin_core').select('name, pfp').eq('email', (await supabase.auth.getSession()).data.session.user.email)
                dispatch(onSignInSuccess(true, (await supabase.auth.getSession()).data.session.access_token))
                console.log(data)
                    dispatch(
                        setUser(
                            {
                                avatar: data[0].pfp,
                                userName: data[0].name, 
                                authority: ['admin'],
                                email: (await supabase.auth.getSession()).data.session.user.email
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
    }

    const signUp = async (values) => {
        try {
            const resp = await apiSignUp(values)
            if (resp.data) {
                const { token } = resp.data
                dispatch(onSignInSuccess(token))
                if (resp.data.user) {
                    dispatch(
                        setUser(
                            resp.data.user || {
                                avatar: '',
                                userName: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const handleSignOut = () => {
        dispatch(onSignOutSuccess())
        dispatch(setUser(initialState))
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        await apiSignOut()
        handleSignOut()
    }

    return {
        authenticated: token && signedIn,
        signIn,
        signOut,
    }
}

export default useAuth
