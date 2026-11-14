"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Sparkles, MapPin, Clock, Star, CheckCircle, ChevronRight, MessageSquare, Phone, Calendar as CalendarIcon, User, ShieldCheck } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { BRANCHES, TREATMENTS, SPA_INFO } from "@/data/spaData";

export default function BookingModal() {
  const { isOpen, closeBooking, selectedBranchId, setSelectedBranchId, selectedTreatmentId, setSelectedTreatmentId } = useBooking();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedBranch, setSelectedBranch] = useState(selectedBranchId || "west-bay");
  const [selectedTreatment, setSelectedTreatment] = useState(selectedTreatmentId || TREATMENTS[0].id);
  const [selectedDuration, setSelectedDuration] = useState("60 min");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("18:00");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [closestNotice, setClosestNotice] = useState<string | null>(null);

  // Sync props when opening
  useEffect(() => {
    if (selectedBranchId) setSelectedBranch(selectedBranchId);
    if (selectedTreatmentId) setSelectedTreatment(selectedTreatmentId);
    if (isOpen) {
      setIsSuccess(false);
      setStep(1);
      // Set default tomorrow date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow.toISOString().split("T")[0]);
    }
  }, [isOpen, selectedBranchId, selectedTreatmentId]);

  if (!isOpen) return null;

  const currentBranchObj = BRANCHES.find((b) => b.id === selectedBranch) || BRANCHES[0];
  const currentTreatmentObj = TREATMENTS.find((t) => t.id === selectedTreatment) || TREATMENTS[0];

  const handleWhatsAppBooking = () => {
    const message = `Hello Just Relax Spa Doha!%0A%0A*New VIP Reservation Request*%0A- *Branch:* ${currentBranchObj.name}%0A- *Treatment:* ${currentTreatmentObj.title}%0A- *Duration:* ${selectedDuration}%0A- *Date:* ${date}%0A- *Time:* ${time}%0A- *Guest Name:* ${guestName || "Gentleman Guest"}%0A- *Phone:* ${guestPhone || "Via WhatsApp"}%0A${notes ? `- *Notes:* ${encodeURIComponent(notes)}%0A` : ""}%0APlease confirm suite availability.`;
    window.open(`https://wa.me/${currentBranchObj.whatsapp.replace(/\D/g, "")}?text=${message}`, "_blank");
    setIsSuccess(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#F7F1E7] border border-[#e8dfd1] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#e8dfd1] flex items-center justify-between bg-[#FCFBF8]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#a67c32]/15 flex items-center justify-center text-[#a67c32]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-widest text-[#a67c32] uppercase">
                Just Relax Spa Doha • Step {step} of 3
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-[#221910]">
                {step === 1 && "Choose Your Doha Branch"}
                {step === 2 && "Select Treatment & Ritual"}
                {step === 3 && "Confirm Date & Guest Details"}
                {isSuccess && "Reservation Confirmed"}
              </h2>
            </div>
          </div>

          <button
            onClick={closeBooking}
            className="w-9 h-9 rounded-full bg-[#F7F1E7] hover:bg-[#a67c32] text-[#554d42] hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-[#e8dfd1] w-full">
          <div
            className="h-full bg-gradient-to-r from-[#a67c32] to-[#d4b370] transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6 bg-[#FCFBF8]">
          {isSuccess ? (
            <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-500/30">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold text-[#221910]">
                  Reservation Received
                </h3>
                <p className="text-sm text-[#695f53] max-w-md mx-auto">
                  Thank you! Our concierge team at <strong className="text-[#221910]">{currentBranchObj.shortName}</strong> will contact you via WhatsApp/call immediately to confirm your VIP suite.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#e8dfd1] max-w-md mx-auto text-left text-xs space-y-2 shadow-sm">
                <div className="flex justify-between py-1 border-b border-[#e8dfd1]">
                  <span className="text-[#695f53]">Branch:</span>
                  <span className="font-semibold text-[#221910]">{currentBranchObj.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#e8dfd1]">
                  <span className="text-[#695f53]">Treatment:</span>
                  <span className="font-semibold text-[#221910]">{currentTreatmentObj.title}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#e8dfd1]">
                  <span className="text-[#695f53]">Schedule:</span>
                  <span className="font-semibold text-[#221910]">{date} at {time} ({selectedDuration})</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#695f53]">Concierge Direct:</span>
                  <span className="font-mono text-[#a67c32] font-bold">{currentBranchObj.phone}</span>
                </div>
              </div>

              <button
                onClick={closeBooking}
                className="inline-flex items-center justify-center py-3 px-8 rounded-full bg-[#a67c32] hover:bg-[#8c6522] text-white text-sm font-semibold shadow-md transition-all"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <>
              {/* STEP 1: SELECT BRANCH */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#554d42]">
                      Select which of our two premier Doha locations is most convenient:
                    </p>
                  </div>

                  {closestNotice && (
                    <div className="p-2.5 rounded-lg bg-[#a67c32]/10 border border-[#a67c32]/30 text-xs text-[#8c6522]">
                      {closestNotice}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-3.5">
                    {BRANCHES.map((branch) => {
                      const isSelected = selectedBranch === branch.id;
                      return (
                        <div
                          key={branch.id}
                          onClick={() => {
                            setSelectedBranch(branch.id);
                            setSelectedBranchId(branch.id);
                          }}
                          className={`relative p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                            isSelected
                              ? "bg-[#FCFBF8] border-[#a67c32] shadow-md"
                              : "bg-[#F7F1E7] border-[#e8dfd1] hover:border-[#a67c32]/60 shadow-sm"
                          }`}
                        >
                          <div className="flex items-start gap-3.5">
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-[#e8dfd1]">
                              <Image
                                src={branch.image}
                                alt={branch.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-base font-serif font-bold text-[#221910]">
                                  {branch.shortName}
                                </h4>
                                {branch.badge && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#a67c32]/15 text-[#8c6522] border border-[#a67c32]/30">
                                    {branch.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#695f53] line-clamp-1">
                                {branch.address}
                              </p>
                              <div className="flex items-center gap-3 text-xs text-[#554d42] pt-1">
                                <span className="flex items-center gap-1 text-[#a67c32] font-semibold">
                                  <Star className="w-3.5 h-3.5 fill-[#a67c32]" />
                                  {branch.rating} ({branch.reviewCount}+)
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                                  <Clock className="w-3.5 h-3.5" />
                                  Open till 3:00 AM
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="sm:self-center shrink-0">
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                                isSelected
                                  ? "bg-[#a67c32] border-[#a67c32] text-white"
                                  : "border-[#cfc6b5] text-transparent"
                              }`}
                            >
                              <CheckCircle className="w-4 h-4 fill-current" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 py-3 px-7 rounded-full bg-[#a67c32] hover:bg-[#8c6522] text-white text-sm font-semibold shadow-md transition-all"
                    >
                      <span>Continue to Treatments</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: SELECT TREATMENT */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#554d42]">
                      Choose your curated ritual or massage:
                    </p>
                    <span className="text-xs text-[#a67c32] font-semibold">
                      Location: {currentBranchObj.shortName}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
                    {TREATMENTS.map((treatment) => {
                      const isSelected = selectedTreatment === treatment.id;
                      return (
                        <div
                          key={treatment.id}
                          onClick={() => {
                            setSelectedTreatment(treatment.id);
                            setSelectedTreatmentId(treatment.id);
                            if (treatment.durationsAvailable.length > 0) {
                              setSelectedDuration(treatment.durationsAvailable[0]);
                            }
                          }}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? "bg-[#FCFBF8] border-[#a67c32] shadow-sm"
                              : "bg-[#F7F1E7] border-[#e8dfd1] hover:border-[#a67c32]/50 shadow-sm"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-[10px] font-bold uppercase text-[#a67c32] tracking-wider">
                                {treatment.categoryLabel}
                              </span>
                              <span className="text-xs font-mono font-bold text-[#221910]">
                                {treatment.priceQAR} QAR
                              </span>
                            </div>
                            <h4 className="text-sm font-serif font-bold text-[#221910]">
                              {treatment.title}
                            </h4>
                            <p className="text-[11px] text-[#695f53] line-clamp-2 mt-1">
                              {treatment.shortDescription}
                            </p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-[#e8dfd1] flex items-center justify-between text-xs">
                            <span className="text-[#554d42]">{treatment.duration}</span>
                            <span
                              className={`text-[11px] font-semibold ${
                                isSelected ? "text-[#a67c32]" : "text-[#8a8074]"
                              }`}
                            >
                              {isSelected ? "Selected ✓" : "Select"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Duration Selector */}
                  {currentTreatmentObj && currentTreatmentObj.durationsAvailable && (
                    <div className="pt-2">
                      <label className="text-xs font-bold text-[#a67c32] uppercase tracking-wider block mb-2">
                        Preferred Duration:
                      </label>
                      <div className="flex gap-2">
                        {currentTreatmentObj.durationsAvailable.map((dur) => (
                          <button
                            key={dur}
                            type="button"
                            onClick={() => setSelectedDuration(dur)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                              selectedDuration === dur
                                ? "bg-[#a67c32] text-white border-[#a67c32]"
                                : "bg-white text-[#383025] border-[#e8dfd1] hover:border-[#a67c32]"
                            }`}
                          >
                            {dur}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-[#695f53] hover:text-[#221910]"
                    >
                      ← Back to Branches
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 py-3 px-7 rounded-full bg-[#a67c32] hover:bg-[#8c6522] text-white text-sm font-semibold shadow-md transition-all"
                    >
                      <span>Proceed to Schedule</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SCHEDULE & GUEST INFO */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Summary Bar */}
                  <div className="p-3 rounded-xl bg-white border border-[#e8dfd1] text-xs flex flex-wrap items-center justify-between gap-2 shadow-sm">
                    <div>
                      <strong className="text-[#221910] block font-serif">{currentTreatmentObj.title}</strong>
                      <span className="text-[#695f53]">{currentBranchObj.shortName} • {selectedDuration}</span>
                    </div>
                    <span className="text-base font-bold text-[#a67c32] font-mono">
                      {currentTreatmentObj.priceQAR} QAR
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-bold text-[#695f53] uppercase tracking-wider block mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-[#FCFBF8] border border-[#e8dfd1] rounded-xl px-3.5 py-2.5 text-sm text-[#221910] focus:outline-none focus:border-[#a67c32]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#695f53] uppercase tracking-wider block mb-1">
                        Preferred Time (Open 10 AM - 3 AM)
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-[#FCFBF8] border border-[#e8dfd1] rounded-xl px-3.5 py-2.5 text-sm text-[#221910] focus:outline-none focus:border-[#a67c32]"
                      >
                        <option value="11:00">11:00 AM (Golden Hours 25% Off)</option>
                        <option value="13:00">1:00 PM (Golden Hours 25% Off)</option>
                        <option value="15:00">3:00 PM (Golden Hours 25% Off)</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="19:00">7:00 PM (Peak Evening)</option>
                        <option value="21:00">9:00 PM (Peak Evening)</option>
                        <option value="23:00">11:00 PM (Late Night Sanctuary)</option>
                        <option value="01:00">1:00 AM (Midnight Tranquility)</option>
                        <option value="02:00">2:00 AM (Late Flight Recovery)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#695f53] uppercase tracking-wider block mb-1">
                        Full Name / Honorific
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mr. Al-Kuwari / John Smith"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-[#FCFBF8] border border-[#e8dfd1] rounded-xl px-3.5 py-2.5 text-sm text-[#221910] focus:outline-none focus:border-[#a67c32]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#695f53] uppercase tracking-wider block mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+974 XX XXX XXX"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full bg-[#FCFBF8] border border-[#e8dfd1] rounded-xl px-3.5 py-2.5 text-sm text-[#221910] focus:outline-none focus:border-[#a67c32]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#695f53] uppercase tracking-wider block mb-1">
                      Preferences / Health Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Pressure preference, focus areas (e.g. lower back, shoulders), or health condition..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[#FCFBF8] border border-[#e8dfd1] rounded-xl px-3.5 py-2 text-sm text-[#221910] focus:outline-none focus:border-[#a67c32] resize-none"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-[#faf7f0] border border-[#e8dfd1] flex items-center gap-2 text-[11px] text-[#695f53]">
                    <ShieldCheck className="w-4 h-4 text-[#a67c32] shrink-0" />
                    <span>Your privacy and data are protected with strict confidentiality in Doha.</span>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs text-[#695f53] hover:text-[#221910]"
                    >
                      ← Back to Treatments
                    </button>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleWhatsAppBooking}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#1b9a59] hover:bg-[#18884e] text-white text-xs font-bold shadow-md hover:scale-105 transition-all"
                      >
                        <MessageSquare className="w-4 h-4 fill-white" />
                        <span>Instant WhatsApp Confirm</span>
                      </button>

                      <button
                        type="submit"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center py-3 px-6 rounded-full bg-[#a67c32] hover:bg-[#8c6522] text-white text-xs font-bold shadow-md"
                      >
                        <span>Reserve Suite</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
