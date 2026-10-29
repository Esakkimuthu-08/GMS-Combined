import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StaffsignUp } from './staff-signup'
import { StudentSignup } from './student-signup'
import img from '../../../assets/welcome.png'

function Register() {
    return (
        <div className="flex w-full h-screen ">
            <div className="flex-1">
                <div className='flex justify-center items-center h-screen'>
                    <Tabs defaultValue="Student" className="w-full">
                        <TabsList className="w-full flex flex-col sm:flex-row gap-2 bg-transparent">
                            <TabsTrigger value="Student">Student Register</TabsTrigger>
                            <TabsTrigger value="Staff">Staff Register</TabsTrigger>
                        </TabsList>
                        <TabsContent value="Student">
                            <StudentSignup />
                        </TabsContent>
                        <TabsContent value="Staff">
                            <StaffsignUp />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <div className="flex-1">
                <img src={img} alt="Login" className="w-full h-screen object-cover" />
            </div>
        </div>
    )
}

export default Register
