"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { businessLines } from "@/data/business-lines";
import { solutions } from "@/data/solutions";

const contactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Enter a valid email address."),
    phone: z
        .string()
        .min(8, "Enter a valid phone number.")
        .max(20, "Phone number is too long.")
        .optional()
        .or(z.literal("")),
    company: z.string().optional().or(z.literal("")),
    relatedTo: z.string().min(1, "Please select a topic."),
    message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * Field-level error message. Error is signaled via icon + bold navy text +
 * border weight (not color hue) to stay inside the navy/white brand family
 * while remaining non-color-only per WCAG.
 */
function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-navy-900">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {message}
        </p>
    );
}

export function ContactForm() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
        "idle"
    );

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            company: "",
            relatedTo: "",
            message: "",
        },
    });

    async function onSubmit(values: ContactFormValues) {
        setStatus("submitting");
        try {
            // [PLACEHOLDER: wire this up to your real contact endpoint / email service]
            await new Promise((resolve) => setTimeout(resolve, 900));
            console.log("Contact form submitted:", values);
            setStatus("success");
            reset();
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <div className="flex flex-col items-center gap-4 rounded-xl border border-navy-200 bg-navy-50 px-6 py-16 text-center">
                <CheckCircle2 className="h-10 w-10 text-navy-800" strokeWidth={1.5} />
                <div>
                    <h3 className="font-display text-xl font-semibold text-navy-900">
                        Message sent
                    </h3>
                    <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-navy-500">
                        Thank you for reaching out. Our team will get back to you shortly.
                    </p>
                </div>
                <Button
                    variant="outline"
                    className="border-navy-300 text-navy-800"
                    onClick={() => setStatus("idle")}
                >
                    Send another message
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            {status === "error" && (
                <div className="flex items-start gap-3 rounded-lg border border-navy-300 bg-navy-50 px-4 py-3">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-navy-800" />
                    <p className="text-sm font-medium text-navy-900">
                        Something went wrong sending your message. Please try again.
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        placeholder="Your full name"
                        aria-invalid={!!errors.name}
                        className={cn(
                            "mt-1.5",
                            errors.name && "border-navy-800 focus-visible:ring-navy-800"
                        )}
                        {...register("name")}
                    />
                    <FieldError message={errors.name?.message} />
                </div>

                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        aria-invalid={!!errors.email}
                        className={cn(
                            "mt-1.5",
                            errors.email && "border-navy-800 focus-visible:ring-navy-800"
                        )}
                        {...register("email")}
                    />
                    <FieldError message={errors.email?.message} />
                </div>

                <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        placeholder="+62 ..."
                        aria-invalid={!!errors.phone}
                        className={cn(
                            "mt-1.5",
                            errors.phone && "border-navy-800 focus-visible:ring-navy-800"
                        )}
                        {...register("phone")}
                    />
                    <FieldError message={errors.phone?.message} />
                </div>

                <div>
                    <Label htmlFor="company">Company (optional)</Label>
                    <Input
                        id="company"
                        placeholder="Your organization"
                        className="mt-1.5"
                        {...register("company")}
                    />
                    <FieldError message={errors.company?.message} />
                </div>
            </div>

            <div>
                <Label htmlFor="relatedTo">Related Business Line / Solution</Label>
                <Controller
                    control={control}
                    name="relatedTo"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger
                                id="relatedTo"
                                aria-invalid={!!errors.relatedTo}
                                className={cn(
                                    "mt-1.5 w-full",
                                    errors.relatedTo && "border-navy-800 focus-visible:ring-navy-800"
                                )}
                            >
                                <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="general">General Inquiry</SelectItem>
                                {businessLines
                                    .sort((a, b) => a.order - b.order)
                                    .map((line) => (
                                        <SelectItem key={line.slug} value={`business-line:${line.slug}`}>
                                            {line.name}
                                        </SelectItem>
                                    ))}
                                {solutions
                                    .sort((a, b) => a.order - b.order)
                                    .map((solution) => (
                                        <SelectItem key={solution.slug} value={`solution:${solution.slug}`}>
                                            {solution.name}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                <FieldError message={errors.relatedTo?.message} />
            </div>

            <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                    id="message"
                    placeholder="Tell us what you need..."
                    aria-invalid={!!errors.message}
                    className={cn(
                        "mt-1.5 min-h-35 resize-none",
                        errors.message && "border-navy-800 focus-visible:ring-navy-800"
                    )}
                    {...register("message")}
                />
                <FieldError message={errors.message?.message} />
            </div>

            <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                className="w-full bg-navy-800 text-white hover:bg-navy-700 sm:w-auto"
            >
                {status === "submitting" ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        Send Message
                        <Send className="h-4 w-4" />
                    </>
                )}
            </Button>
        </form>
    );
}