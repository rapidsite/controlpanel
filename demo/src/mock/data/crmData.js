


function getDate(dayString) {
    const today = new Date()
    const year = today.getFullYear().toString()
    let month = (today.getMonth() + 1).toString()

    if (month.length === 1) {
        month = '0' + month
    }

    return dayString.replace('YEAR', year).replace('MONTH', month)
}


export const crmDashboardData = {
    statisticData: [
        {
            key: 'newLeads',
            label: 'New Leads',
            value: 0,
            growShrink: 2.6,
        },
        
        {
            key: 'emailResponse',
            label: 'Appointment',
            value: 12,
            growShrink: 2.6,
        },
    ],
    leadByRegionData: [
        {
            name: 'United States of America',
            value: 37.61,
        },
        {
            name: 'Brazil',
            value: 16.79,
        },
        {
            name: 'India',
            value: 12.42,
        },
        {
            name: 'China',
            value: 9.85,
        },
        {
            name: 'Algeria',
            value: 7.68,
        },
        {
            name: 'Indonesia',
            value: 5.11,
        },
    ],
    recentLeadsData: [
        {
            id: 1,
            name: 'Eileen Horton',
            avatar: '/img/avatars/thumb-1.jpg',
            status: 0,
            createdTime: 1623430400,
            email: 'eileen_h@hotmail.com',
            assignee: 'Carrie Harris',
        },
        {
            id: 2,
            name: 'Terrance Moreno',
            avatar: '/img/avatars/thumb-2.jpg',
            status: 1,
            createdTime: 1632393600,
            email: 'terrance_moreno@infotech.io',
            assignee: 'Toni Lane',
        },
        {
            id: 3,
            name: 'Ron Vargas',
            avatar: '/img/avatars/thumb-3.jpg',
            status: 1,
            createdTime: 1632393600,
            email: 'ronnie_vergas@infotech.io',
            assignee: 'Joanne Mendoza',
        },
        {
            id: 4,
            name: 'Luke Cook',
            avatar: '/img/avatars/thumb-4.jpg',
            status: 2,
            createdTime: 1632761600,
            email: 'cookie_lukie@hotmail.com',
            assignee: 'Lorraine Carr',
        },
        {
            id: 5,
            name: 'Joyce Freeman',
            avatar: '/img/avatars/thumb-5.jpg',
            status: 3,
            createdTime: 1632416000,
            email: 'joyce991@infotech.io',
            assignee: 'Myrtle Mason',
        },
        {
            id: 6,
            name: 'Samantha Phillips',
            avatar: '/img/avatars/thumb-6.jpg',
            status: 0,
            createdTime: 1633107200,
            email: 'samanthaphil@infotech.io',
            assignee: 'Perry Ward',
        },
    ],
    emailSentData: {
        precent: 73,
        opened: 893,
        unopen: 330,
        total: 1223,
    },
}

export const eventsData = [
    {
        id: '0',
        title: 'All Day Event',
        start: getDate('YEAR-MONTH-01'),
        eventColor: 'orange',
    },
    {
        id: '1',
        title: 'Long Event',
        start: getDate('YEAR-MONTH-07'),
        end: getDate('YEAR-MONTH-10'),
        eventColor: 'red',
    },
    {
        id: '2',
        groupId: '999',
        title: 'Repeating Event',
        start: getDate('YEAR-MONTH-09T16:00:00+00:00'),
        eventColor: 'blue',
    },
    {
        id: '3',
        groupId: '999',
        title: 'Repeating Event',
        start: getDate('YEAR-MONTH-16T16:00:00+00:00'),
        eventColor: 'blue',
    },
    {
        id: '4',
        title: 'Conference',
        start: 'YEAR-MONTH-17',
        end: getDate('YEAR-MONTH-19'),
        eventColor: 'blue',
    },
    {
        id: '5',
        title: 'Meeting',
        start: getDate('YEAR-MONTH-18T10:30:00+00:00'),
        end: getDate('YEAR-MONTH-18T12:30:00+00:00'),
        eventColor: 'blue',
    },
    {
        id: '6',
        title: 'Lunch',
        start: getDate('YEAR-MONTH-18T12:00:00+00:00'),
        eventColor: 'emerald',
    },
    {
        id: '7',
        title: 'Birthday Party',
        start: getDate('YEAR-MONTH-19T07:00:00+00:00'),
        eventColor: 'purple',
    },
    {
        id: '8',
        title: 'Meeting',
        start: getDate('YEAR-MONTH-18T14:30:00+00:00'),
        eventColor: 'blue',
    },
    {
        id: '9',
        title: 'Happy Hour',
        start: getDate('YEAR-MONTH-18T17:30:00+00:00'),
        eventColor: 'cyan',
    },
    {
        id: '10',
        title: 'Dinner',
        start: getDate('YEAR-MONTH-18T20:00:00+00:00'),
        eventColor: 'emerald',
    },
]

export const mailData = [
    {
        id: 1,
        name: 'Eileen ',
        label: '',
        group: 'sentItem',
        flagged: false,
        starred: false,
        from: 'eileen_h@hotmail.com',
        avatar: '/img/avatars/thumb-1.jpg',
        title: "An 'extremely credible source'",
        mail: ['nathan@themenate.com'],
        message: [
            {
                id: 11,
                name: 'Eileen Horton',
                mail: ['nathan@themenate.com'],
                from: 'eileen_h@hotmail.com',
                avatar: '/img/avatars/thumb-1.jpg',
                date: '12:06PM',
                content:
                    "<p>Hi Nathan,</p><br /><p>An 'extremely credible source' has called my office and told me that Barack Obama's placeholder text is a fraud. Lorem Ipsum best not make any more threats to your website. It will be met with fire and fury like the world has never seen.</p><p>This can't be! Artoo, you're playing the wrong message. There will be no bargain. We're doomed. I will not give up my favorite decoration. I like Captain Solo where he is. Artoo, look! Captain Solo. And he's still frozen in carbonite. What could possibly have come over Master Luke. Is it something I did? He never expressed any unhappiness with my work. Oh! Oh! Hold it! Ohh!</p><p> <br>Your fleet has lost. And your friends on the Endor moon will not survive. There is no escape, my young apprentice. <br><br><br>Moruth Doole, <br></p>",
                attachment: [
                    {
                        file: 'Prospectus.doc',
                        size: '1MB',
                        type: 'doc',
                    },
                    {
                        file: 'Financial_Report.xls',
                        size: '652KB',
                        type: 'xls',
                    },
                ],
            },
            {
                id: 12,
                name: 'Nathan',
                mail: ['nathan@themenate.com'],
                from: 'eileen_h@hotmail.com',
                avatar: '/img/avatars/thumb-16.jpg',
                date: '08:49AM',
                content:
                    "<p>Hi Eileen,</p><br /><p>We will never become a truly paper-less society until the Palm Pilot folks come out with WipeMe 1.0. </p> <br><p> The cheapest, fastest, and most reliable components are those that aren't there. Ready, fire, aim: the fast approach to software development. Ready, aim, aim, aim, aim: the slow approach to software development. Software undergoes beta testing shortly before it's released. Beta is Latin for “still doesn't work”. </p> <br> <br><p>Regards,</p>",
                attachment: [],
            },
            {
                id: 22,
                name: 'Eileen Horton',
                mail: ['nathan@themenate.com'],
                from: 'eileen_h@hotmail.com',
                avatar: '/img/avatars/thumb-1.jpg',
                date: '03:27AM',
                content:
                    '<p>Hi Nathan,</p><br /><p>Saucer grinder to go organic extraction coffee frappuccino lungo. Carajillo, dark, bar , qui, rich latte medium aged americano. Cream breve, mug at flavour half and half breve.</p> <br> <p>Plunger pot redeye con panna, in, espresso brewed et americano ut spoon. Java frappuccino plunger pot coffee, eu coffee shop variety percolator id robusta black. As plunger pot, americano, mocha skinny, at aroma grinder arabica americano wings spoon.</p> <br><br>Moruth Doole',
                attachment: [],
            },
        ],
    }
]
