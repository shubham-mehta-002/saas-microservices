"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, ArrowRight, X, Plus } from "lucide-react"
import { Label } from "@/src/components/forms/Label"
import { Controller, useForm } from "react-hook-form"
import { signUpAsFreelancerSchema, signUpAsFreelancerType } from "@project/shared"
import { zodResolver } from "@hookform/resolvers/zod"
import { freelancerAvailablity } from "@project/shared"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { errorToast, successToast } from "@/src/lib"
import { useSignUpAsFreelancerMutation } from "@/src/hooks/mutations/profile"
import { Error } from "@/src/components"

export default function BecomeFreelancerPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)

    const {getValues, handleSubmit , control, formState : {errors} , watch, setValue , trigger, register} = useForm({
        resolver : zodResolver(signUpAsFreelancerSchema),
        defaultValues : {
            skills : []
        }
    })

    const signUpAsFreelancerMutation = useSignUpAsFreelancerMutation()

    const [newSkill, setNewSkill] = useState("")
    const skills = watch("skills")

    const steps = [
        { id: 1, title: "Professional Info", description: "Tell us about your services" },
        { id: 2, title: "Skills", description: "What are your strengths?" },
        { id: 3, title: "Review & Confirm", description: "Ready to become a freelancer?" },
    ]

    async function handleNextStep(){
        const {bio,title,hourlyRate,availability,skills} = getValues()
    
        if(currentStep == 1){
            if(!bio || !title || !hourlyRate || !availability){
                errorToast("Fill all the details before proceeding")
            }else{
                setCurrentStep(previousStep => previousStep + 1)
            }
            return
        }else if(currentStep == 2){
            const isValid = await trigger("skills")
            if(!isValid){
                errorToast(errors.skills?.message || "Fill skills properly")
            }else{
                setCurrentStep(previousStep => previousStep + 1)
            }
            return
        }
    }

    const handleAddSkill = () => {
        const trimmedSkill = newSkill.trim()

        if (!trimmedSkill) return
        if (skills.includes(trimmedSkill)) return

        setValue("skills", [...skills, trimmedSkill], { shouldValidate: true })
        setNewSkill("")
    }

    const handleRemoveSkill = (skill: string) => {
        setValue(
            "skills",
            skills.filter((s) => s !== skill),
            { shouldValidate: true }
        )
    }

    const onSubmit = (data : signUpAsFreelancerType) => {
        if (currentStep !== 3) return
        signUpAsFreelancerMutation.mutate(data , {
            onSuccess : (res) => {
                successToast(res.message || "Registered as Freelancer")
                router.push("/")
            }
        })
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Become a Freelancer</h1>
                <p className="text-muted-foreground">
                    Upgrade your account to start offering services and earn money on UniLance
                </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex items-baseline justify-between">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                        <div className="flex flex-col items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                                currentStep >= step.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground border border-border"
                            }`}>
                                {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-semibold">{step.title}</p>
                                <p className="text-xs text-muted-foreground">{step.description}</p>
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`hidden sm:visible w-16 h-1 mx-4 rounded transition-colors ${
                                currentStep > step.id ? "bg-primary" : "bg-muted"
                            }`} />
                        )}
                    </div>
                ))}
                </div>
            </div>

            {/* Form Steps */}
            <Card className="p-5 md:p-8">
                <form>
                {/* Step 1: Professional Info */}
                {currentStep === 1 && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div>
                            <Label label="Professional Title *"/>
                            <Input
                                placeholder="e.g., Full-Stack Developer, UI/UX Designer"
                                {...register("title")}
                                className="mb-1 text-sm sm:text-md"
                            />
                            <p className="text-xs text-muted-foreground">This is how clients will see your expertise at a glance</p>
                            <Error message={errors.title?.message || ""}/>
                        </div>

                        <div>
                            <Label label="Professional Bio *"/>
                            <Textarea
                                placeholder="Tell clients about yourself, your experience, and what makes you unique..."
                                {...register("bio")}
                                className="min-h-[120px] mb-1 text-sm sm:text-md"
                            />
                            <p className="text-xs text-muted-foreground">
                                A good bio helps clients understand your background and expertise
                            </p>
                            <Error message={errors.bio?.message || ""}/>
                        </div>

                        <div>
                            <Label label="Hourly Rate (₹) *"/>
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">₹</span>
                                <Input
                                    type="number"
                                    placeholder="50"
                                    {...register("hourlyRate")}
                                    className="text-sm sm:text-md"
                                />
                                <span className="text-muted-foreground">/hour</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                You can adjust this later. Consider your experience and market rates
                            </p>
                            <Error message={errors.hourlyRate?.message || ""}/>
                        </div>

                        <div>
                            <Label label="Availability *"/>
                            <Controller     
                                control={control}
                                name = "availability"
                                render={
                                    ({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select your availability"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Availability</SelectLabel>
                                                {freelancerAvailablity?.map((availability,index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={availability.toString()}
                                                >
                                                    {availability}
                                                </SelectItem>
                                                ))}
                                            </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )
                                }
                            />
                            <Error message={errors.availability?.message || ""}/>
                        </div>
                    </div>
                )}

                <Controller
                    name="skills"
                    control={control}
                    rules={{
                        validate: (value) =>
                        value.length >= 3 || "Add at least 3 skills",
                    }}
                    render={() => <></>}
                />

                {/* Step 2: Skills */}
                {currentStep === 2 && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div>
                            <Label label="Skills*"/>
                            <div className="flex gap-2 mb-3">
                                <Input
                                    placeholder="e.g., React, Node.js, Python"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault()
                                            handleAddSkill()
                                        }
                                    }}
                                    className="text-sm sm:text-md"
                                />
                                <Button type="button" onClick={handleAddSkill} size="sm">
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>

                            {skills.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <Badge key={skill} variant="secondary" className="text-sm py-1.5 px-3 flex items-center gap-2">
                                            {skill}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSkill(skill)}
                                                className="ml-1 hover:opacity-70"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}
                            <Error message={errors.skills?.message || ""}/>
                            <p className="text-xs text-muted-foreground mt-2">Add at least 3 skills to help clients find you</p>
                        </div>
                    </div>
                )}

                {/* Step 3: Review & Confirm */}
                {currentStep === 3 && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        {(errors.availability || errors.bio || errors.hourlyRate || errors.skills|| errors.title ) ? <Error message="*Your form has some errors"/> : <></>}
                        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6">
                            <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                                ✓ You're ready to become a freelancer!
                            </p>
                            <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                                Once you confirm, you'll be able to create gigs, receive orders, and start earning.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="border rounded-lg p-4">
                                <h3 className="font-semibold text-sm mb-3">Your Profile Summary</h3>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Professional Title:</span>
                                        <span className="font-medium">{getValues().title}</span>
                                    </div>
                                    <div className="flex justify-between items-start gap-2">
                                        <span className="text-muted-foreground">Bio:</span>
                                        <span className="font-medium text-right max-w-xs">{getValues().bio.substring(0, 50)}...</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Hourly Rate:</span>
                                        <span className="font-medium">${getValues().hourlyRate as string}/hour</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Availability:</span>
                                        <span className="font-medium">{getValues().availability}</span>
                                    </div>
                                    <div className="flex justify-between items-start gap-2">
                                        <span className="text-muted-foreground">Skills:</span>
                                        <div className="flex flex-wrap gap-1 justify-end max-w-xs">
                                            {getValues().skills.map((skill) => (
                                                <Badge key={skill} variant="secondary" className="text-xs">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8 pt-6 border-t border-border">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                        disabled={currentStep === 1}
                        className="flex-1 bg-transparent"
                    >
                        Previous
                    </Button>

                    {currentStep < 3 ? (
                        <Button
                            type="button"
                            onClick={handleNextStep}
                            className="flex-1"
                        >
                            Next
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        
                        <Button 
                            type="button" 
                            disabled={signUpAsFreelancerMutation.isPending} 
                            className="flex-1"
                            onClick={handleSubmit(onSubmit)}
                            onKeyDown={(e) => {
                                if(e.key === "Enter"){
                                    e.preventDefault();
                                    handleSubmit(onSubmit)
                                }
                            }}
                        >
                            {signUpAsFreelancerMutation.isPending ? "Upgrading..." : "Become a Freelancer"}
                        </Button>
                    )}
                </div>
                </form>
            </Card>
            </main>
        </div>
    )
}
