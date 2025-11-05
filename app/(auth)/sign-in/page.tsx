'use client';

import InputField from "@/components/forms/InputField";
import {Button} from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";
import {useForm} from "react-hook-form";
import {signInWithEmail} from "@/lib/actions/auth.actions";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

const SignIn = () => {
    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState:{errors,isSubmitting}
    } = useForm<SignInFormData>({
        defaultValues:{
          "email":'',
          "password":'',
        },
        mode:"onBlur"
    })

    const onSubmit = async (data : SignInFormData) =>{
        try{
            const result = await signInWithEmail(data)
            if(result.success){
                router.push("/");
            }

        }catch (e) {
            console.error(e);
            toast.error("Sign in failed",
                {
                    description: e instanceof Error ? e.message : 'Failed to sign in'
                });
        }
    };

    return (
        <>
            <h1 className="form-title">Log in to Your Account</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    register={register}
                    error = {errors.email}
                    validation = {{required:"Email is required",message:"Email is required",pattern:/^\w+@\w+\.\w+$/,}}
                />
                <InputField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    register={register}
                    error = {errors.password}
                    validation = {{required:"Password is required",minLength:8}}
                />
                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? "Logging In" : "Log In"}
                </Button>
                <FooterLink text="Don't have an account?" linkText="Sign Up" href="/sign-up"/>
            </form>
        </>
    )
}
export default SignIn
