import Home from "~/features/home";

export default function HomePage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) { 
  return (
   <Home searchParams={searchParams}/>
  );
}
