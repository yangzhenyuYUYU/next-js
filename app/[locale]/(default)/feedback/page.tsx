"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageCircle } from "lucide-react";

interface FormData {
  type: string;
  title: string;
  content: string;
  contact: string;
}

interface FormErrors {
  type: string;
  title: string;
  content: string;
  contact: string;
}

export default function FeedbackPage() {
  const [formData, setFormData] = useState<FormData>({
    type: "",
    title: "",
    content: "",
    contact: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    type: "",
    title: "",
    content: "",
    contact: "",
  });

  const validateForm = () => {
    const newErrors: FormErrors = {
      type: "",
      title: "",
      content: "",
      contact: "",
    };

    if (!formData.type) {
      newErrors.type = "Please select a feedback type";
    }
    if (formData.title.length < 2) {
      newErrors.title = "Title must be at least 2 characters";
    }
    if (formData.content.length < 10) {
      newErrors.content = "Content must be at least 10 characters";
    }
    if (!formData.contact.includes("@")) {
      newErrors.contact = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the feedback to your backend
      console.log(formData);
      alert("Thank you for your feedback! We'll get back to you soon.");
      setFormData({
        type: "",
        title: "",
        content: "",
        contact: "",
      });
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />
            <CardTitle>Submit Feedback</CardTitle>
          </div>
          <CardDescription>
            We value your feedback. Please fill out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Feedback Type</label>
              <Select
                value={formData.type}
                onValueChange={(value: string) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a type of feedback" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="improvement">Improvement</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="Brief description of your feedback"
                value={formData.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => 
                  setFormData({ ...formData, title: e.target.value })}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <Textarea
                placeholder="Please provide detailed information about your feedback..."
                className="min-h-[150px]"
                value={formData.content}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => 
                  setFormData({ ...formData, content: e.target.value })}
              />
              {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Contact Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.contact}
                onChange={(e: ChangeEvent<HTMLInputElement>) => 
                  setFormData({ ...formData, contact: e.target.value })}
              />
              {errors.contact && <p className="text-sm text-red-500">{errors.contact}</p>}
            </div>

            <Button type="submit" className="w-full">
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
