'use client';

import InputField from "@/components/forms/InputField";
import {Button} from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";
import {useForm} from "react-hook-form";

const SignIn = () => {

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
            console.log(data);
        }catch (e) {
            console.error(e);
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
