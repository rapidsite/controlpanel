import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'

let tempPayload = undefined
const supabase = createClient('https://havlxegijmnxtdwjvxdv.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhdmx4ZWdpam1ueHRkd2p2eGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwODU3NzUsImV4cCI6MTk5ODY2MTc3NX0.YWbnSVFmSt9KSnGRxYommvTb2JZWat0hR3HvXzU-oLc')
const channel = supabase.channel('any').on('postgres_changes', {event: '*', schema: '*'}, (payload) => tempPayload = payload).subscribe()

console.log(channel)

export const useHeaders = () => {
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    const getHeaders = async () => {
        const { data: headersList } = await supabase
        .from('admin_core')
        .select('headers');
      const parsedHeaders = JSON.parse(headersList[0].headers || '[]');
      const headers = [
      ...parsedHeaders.map(task => ({
        title: task.title,
        listId: task.listId
      })),
    ]
      setHeaders(headers);
    };
    getHeaders();
  }, [tempPayload, setHeaders]);

  return headers;
};





