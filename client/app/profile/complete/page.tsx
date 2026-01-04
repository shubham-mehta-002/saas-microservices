'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { profileDetailsSchema, profileDetailsType } from "@project/shared"
import { useForm, Controller } from "react-hook-form"
import { FormInputWithLabel, Error } from "@/src/components"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { useActiveCollegesQuery } from "@/src/hooks/queries/college/useCollegeQuery"
import { useCompleteProfileMutation } from "@/src/hooks/mutations/profile"
import { successToast } from "@/src/lib"
import { useRouter } from "next/navigation"

export default function ProfileDetailsForm() {

const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
} = useForm<profileDetailsType>({
    resolver: zodResolver(profileDetailsSchema)
})


const { data, isLoading, isError } = useActiveCollegesQuery()
const completeProfileMuation = useCompleteProfileMutation();

const router = useRouter()

const onSubmit = (data: profileDetailsType) => {
    completeProfileMuation.mutate(data,{
        onSuccess : (res) => {
            successToast(res.message || "Profile Updated")
            router.replace('/');
        }
    })
}



if (isLoading) return <div>Loading...</div>
if (isError) return <div>Error loading colleges</div>


return (
<div className="min-h-screen bg-background">
    <div className="wrapper">
    <div className="mt-30 w-full md:w-1/2 max-w-[500px] mx-auto">
        <div className="border-2 border-black rounded-md shadow-lg px-4 py-6">

        {/* Header */}
        <div className="mb-5">
            <div className="text-2xl font-semibold">Fill Your Details</div>
            <div className="text-md">Enter your credentials to access your account</div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

            <FormInputWithLabel
                label="Full Name"
                placeholder="Full Name"
                {...register("name")}
                error={errors.name?.message}
            />

            <FormInputWithLabel
                label="Course"
                placeholder="Enter your Course name"
                {...register("courseName")}
                error={errors.courseName?.message}
            />

            
            {/* Year of Study */}
            <div className="flex flex-col gap-1">
            <Controller
                name="yearOfStudy"
                control={control}
                render={({ field }) => (
                <Select
                    value={field.value?.toString()}
                    onValueChange={(value) => field.onChange(Number(value))}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select year of study" />
                    </SelectTrigger>

                    <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Year of Study</SelectLabel>
                        {[1, 2, 3, 4, 5].map(year => (
                        <SelectItem key={year} value={year.toString()}>
                            Year {year}
                        </SelectItem>
                        ))}
                    </SelectGroup>
                    </SelectContent>
                </Select>
                )}
            />
            <Error message={errors.yearOfStudy?.message || ""} />
            </div>

            
            {/* College Select */}
            <div className="flex flex-col gap-1">
            <Controller
                name="collegeId"
                control={control}
                render={({ field }) => (
                <Select
                    value={field.value}
                    onValueChange={field.onChange}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Your College / University" />
                    </SelectTrigger>

                    <SelectContent>
                    <SelectGroup>
                        <SelectLabel>College / University</SelectLabel>
                        {data?.data?.map(college => (
                        <SelectItem key={college._id} value={college._id}>
                            {college.name}, {college.campus}
                        </SelectItem>
                        ))}
                    </SelectGroup>
                    </SelectContent>
                </Select>
                )}
            />
            <Error message={errors.collegeId?.message || ""} />
            </div>

            <Button
                type="submit"
                disabled={completeProfileMuation.isPending}
                className=""
            >
            {completeProfileMuation.isPending ? "Submitting..." : "Submit"}
            </Button>


        </form>
        <div className="flex justify-end mt-2">
        <Link href="/" className="text-xs text-primary underline">
            Skip
        </Link>
        </div>
        </div>
    </div>
    </div>
</div>
)
}
