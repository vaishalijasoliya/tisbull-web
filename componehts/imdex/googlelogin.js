import { Box} from "@mui/material";
import { useRef } from "react";
import useScript from "./hokas";

export default function GoogleLogin({
    onGoogleSignIn = () => { },
    text = "signin_with",
    // feel free to add more options here
}) {
    const googleSignInButton = useRef(null);

    useScript("https://accounts.google.com/gsi/client", () => {
        console.log(process.env.NEXT_PUBLIC_CLINT_ID, 'CLIENT_ID')
        window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_CLINT_ID,
            callback: async response => {
                try {
                    const res = await fetch(
                        `https://oauth2.googleapis.com/tokeninfo?id_token=${response.credential}`
                    )
                    if (res.ok) {
                        const body = await res.json()
                        onGoogleSignIn(body)
                    } else {
                        console.log(res)
                    }
                } catch (err) {
                    console.log(err)
                }
            },
        });
        window.google.accounts.id.renderButton(
            googleSignInButton.current,
            { theme: "outline", size: "large", text, width: "300" } // customization attributes
        );
    });

    return <Box
        sx={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}
        ref={googleSignInButton}></Box>
        
}