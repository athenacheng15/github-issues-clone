import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	"https://kelqvzdfhmtyadjoyvxp.supabase.co",
	process.env.REACT_APP__SUPABASE_TOKEN
);

export { supabase };
