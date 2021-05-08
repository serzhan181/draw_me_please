import { URL, KEY_PUBLIC } from '../../../../config.json'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(URL, KEY_PUBLIC)

export async function getRooms() {
  const { data: rooms, error } = await supabase.from('rooms').select('*')

  if (error) return { error }

  return rooms
}

export async function insertRoom({ name }) {
  const { data, error } = await supabase.from('rooms').insert([{ name }])

  if (error) return { error }

  return data
}

const subscription = supabase
  .from('rooms')
  .on('INSERT', (payload) => {
    console.log(payload)
  })
  .subscribe()
