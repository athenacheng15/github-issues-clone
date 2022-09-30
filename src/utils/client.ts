import { createClient } from "@supabase/supabase-js";

const url =
	process.env.NODE_ENV === "production"
		? process.env.REACT_APP_FIREBASE_SUPABASE_URI
		: process.env.REACT_APP_LOCAL_SUPABASE_URI;

const key =
	process.env.NODE_ENV === "production"
		? process.env.REACT_APP_FIREBASE_SUPABASE_TOKEN
		: process.env.REACT_APP_LOCAL_SUPABASE_TOKEN;
const supabase = createClient(url as string, key as string);

export { supabase };
