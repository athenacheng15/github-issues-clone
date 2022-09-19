import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	"https://kelqvzdfhmtyadjoyvxp.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbHF2emRmaG10eWFkam95dnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM1OTMzNDAsImV4cCI6MTk3OTE2OTM0MH0.sVqw2I9nSSSynsv64frPSo7cI_uyq8CeH5eBK_nz8AQ"
);

export { supabase };
