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
    import { Label } from "@/components/ui/label"
    import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription
    } from "@/components/ui/card"

    export default function ProfileDetailsForm() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<profileDetailsType>({
        resolver: zodResolver(profileDetailsSchema)
    })

    const { data, isLoading, isError } = useActiveCollegesQuery()
    const completeProfileMuation = useCompleteProfileMutation()
    const router = useRouter()

    const onSubmit = (data: profileDetailsType) => {
        completeProfileMuation.mutate(data, {
        onSuccess: (res) => {
            successToast(res.message || "Profile Updated")
            router.replace("/")
        }
        })
    }

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error loading colleges</div>

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-lg border">
            {/* ---------- Header ---------- */}
            <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-semibold">
                Fill Your Details
            </CardTitle>
            <CardDescription>
                Complete your profile to continue
            </CardDescription>
            </CardHeader>

            {/* ---------- Form ---------- */}
            <CardContent className="space-y-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
            >
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

                {/* ---------- Year of Study ---------- */}
                <div className="flex flex-col gap-1">
                <Label className="text-muted-foreground">
                    Current Year
                </Label>
                <Controller
                    name="yearOfStudy"
                    control={control}
                    render={({ field }) => (
                    <Select
                        value={field.value?.toString()}
                        onValueChange={(value) =>
                        field.onChange(Number(value))
                        }
                    >
                        <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select year of study" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Year of Study</SelectLabel>
                            {[1, 2, 3, 4, 5].map((year) => (
                            <SelectItem
                                key={year}
                                value={year.toString()}
                            >
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

                {/* ---------- College ---------- */}
                <div className="flex flex-col gap-1">
                <Label className="text-muted-foreground">
                    College / University
                </Label>
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
                            {data?.data?.map((college) => (
                            <SelectItem
                                key={college._id}
                                value={college._id}
                            >
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
                >
                {completeProfileMuation.isPending
                    ? "Submitting..."
                    : "Submit"}
                </Button>
            </form>

            {/* ---------- Skip ---------- */}
            <div className="flex justify-end">
                <Link
                href="/"
                className="text-xs text-primary underline"
                >
                Skip
                </Link>
            </div>
            </CardContent>
        </Card>
        </div>
    )
    }
