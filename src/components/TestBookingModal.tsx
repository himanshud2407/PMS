"use client";

import * as React from "react";
import {
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  Globe,
  Info,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { MultiStepForm } from "@/components/ui/multi-step-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TooltipIcon = ({ text }: { text: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
      </TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

import { submitToGoogleSheets } from "@/lib/google-sheets";

export function TestBookingModal({ 
  isOpen, 
  onClose,
  testName
}: { 
  isOpen: boolean; 
  onClose: () => void;
  testName?: string;
}) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: "",
    phone: "",
    email: "",
    gender: "",
    collectionType: "",
    address: "",
    date: "",
    notes: ""
  });
  const totalSteps = 3;

  const handleInputChange = (field: string, value: string) => {
    if (field === 'phone') {
      // Only allow numbers and limit to 10 digits
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [field]: cleaned }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleNext = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      const data = {
        FullName: formData.fullName,
        Email: formData.email,
        ContactNumber: formData.phone,
        TestType: testName || "Custom Test",
        PreferredDate: formData.date,
        Gender: formData.gender,
        CollectionType: formData.collectionType,
        Address: formData.address,
        Notes: formData.notes
      };

      const result = await submitToGoogleSheets(data, 'Bookings');
      setIsSubmitting(false);

      if (result.success) {
        setIsSuccess(true);
        // Reset form but don't close immediately
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          gender: "",
          collectionType: "",
          address: "",
          date: "",
          notes: ""
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
        onClick={onClose}
      >
        <div onClick={(e) => e.stopPropagation()} className="w-full max-w-3xl">
          <MultiStepForm
            currentStep={currentStep}
            totalSteps={totalSteps}
            title={testName ? `Book Test: ${testName}` : "Book a Diagnostic Test"}
            description="Complete the steps to schedule your appointment."
            onBack={handleBack}
            onNext={handleNext}
            onClose={onClose}
            hideHeader={isSuccess}
            hideFooter={isSuccess}
            nextButtonText={isSubmitting ? "Confirming..." : currentStep === totalSteps ? "Confirm Booking" : "Next Step"}
            footerContent={
              <a href="#" className="flex items-center gap-1 text-sm text-primary hover:underline">
                Need Help? <ArrowUpRight className="h-4 w-4" />
              </a>
            }
          >
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 md:py-12 flex flex-col items-center text-center space-y-4"
              >
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold">Booking Confirmed!</h3>
                <p className="text-sm md:text-base text-muted-foreground max-w-sm px-4">
                  Your appointment for <strong>{testName || "Diagnostic Test"}</strong> has been scheduled successfully. We will contact you shortly for confirmation.
                </p>
                <Button onClick={onClose} className="mt-4 rounded-xl px-8">
                  Great, Thanks!
                </Button>
              </motion.div>
            ) : (
              <>
                {/* Step 1: Patient Information */}
                {currentStep === 1 && (
                  <div className="space-y-4 md:space-y-6">
                    <h3 className="text-base md:text-lg font-medium">Patient Details</h3>
                    <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="fullName" 
                            className="pl-9" 
                            placeholder="John Doe" 
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Contact Number (10 digits)</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="phone" 
                            type="tel" 
                            className="pl-9" 
                            placeholder="98765 43210" 
                            maxLength={10}
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                          />
                        </div>
                      </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="email" 
                        type="email" 
                        className="pl-9" 
                        placeholder="john@example.com" 
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="gender">Gender</Label>
                    </div>
                    <Select value={formData.gender} onValueChange={(val) => handleInputChange('gender', val)}>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Appointment Details */}
            {currentStep === 2 && (
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-base md:text-lg font-medium">Appointment Details</h3>
                <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="collectionType">Collection Method</Label>
                      <TooltipIcon text="Choose how you would like your sample to be collected." />
                    </div>
                    <Select value={formData.collectionType} onValueChange={(val) => handleInputChange('collectionType', val)}>
                      <SelectTrigger id="collectionType">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Select method..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lab">Visit Laboratory</SelectItem>
                        <SelectItem value="home">Home Sample Collection</SelectItem>
                        <SelectItem value="other">Other (Specify in Notes)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="date">Preferred Date</Label>
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="date" 
                        type="date" 
                        className="pl-9" 
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {formData.collectionType === 'home' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-2 md:col-span-2"
                    >
                      <Label htmlFor="address">Full Address for Collection</Label>
                      <Input 
                        id="address" 
                        placeholder="Enter your complete home/office address" 
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                    </motion.div>
                  )}

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Input 
                      id="notes" 
                      placeholder="Any specific instructions or medical history?" 
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                    />
                  </div>
                </div>

                <Alert variant="info" className="mt-4">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Home collection may incur additional charges based on your location.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-base md:text-lg font-medium">Review & Confirm</h3>
                <div className="bg-muted/30 p-4 md:p-6 rounded-xl border space-y-3 md:space-y-4 text-xs md:text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Patient:</span>
                    <span className="font-medium">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Test:</span>
                    <span className="font-medium">{testName || "Custom Diagnostic Test"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Method:</span>
                    <span className="font-medium capitalize">{formData.collectionType || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{formData.date || "Not selected"}</span>
                  </div>
                </div>
                
                <Alert variant="warning">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Please ensure fasting is done if required by your selected test. Our team will call you to confirm the exact time slot.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </>
        )}
      </MultiStepForm>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
