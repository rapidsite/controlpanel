import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js'

let tempPayload = undefined
const supabase = createClient('https://havlxegijmnxtdwjvxdv.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhdmx4ZWdpam1ueHRkd2p2eGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwODU3NzUsImV4cCI6MTk5ODY2MTc3NX0.YWbnSVFmSt9KSnGRxYommvTb2JZWat0hR3HvXzU-oLc')
const channel = supabase.channel('any').on('postgres_changes', {event: '*', schema: '*'}, (payload) => tempPayload = payload).subscribe()

console.log(channel)

export const useTaskCards = () => {
  const [taskCards, setTaskCards] = useState([]);

  useEffect(() => {
    const getTaskCards = async () => {
      const { data: completedTasks } = await supabase
        .from('admin_core')
        .select('tasks');
      const parsedTasks = JSON.parse(completedTasks[0].tasks || '[]');

      var taskCards = [
        ...parsedTasks.map(task => ({
          id: task.id,
          name: task.name,
          comments: task.comments,
          description: task.description,
          attachments: task.attachments,
          members: task.members,
          dueDate: task.dueDate,
          labels: task.labels,
          listId: task.listId,
        })),
      ];
      setTaskCards(taskCards);
    };
    getTaskCards()
  }, [tempPayload]);
  return taskCards;
};


