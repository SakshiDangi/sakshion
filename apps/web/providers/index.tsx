"use client";

import ThemeProvider from "./ThemeProvider";
import QueryProvider from "./QueryProvider";
import AuthProvider from "./AuthProvider";


export default function Providers({
children,
}:{
children:React.ReactNode;
}){


return (

<AuthProvider>

<ThemeProvider>

<QueryProvider>

{children}

</QueryProvider>

</ThemeProvider>

</AuthProvider>

);

}