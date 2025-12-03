import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Calendar, Check, AlertCircle, Loader2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const logo = '/default_images/logo_default.webp';

gsap.registerPlugin(ScrollTrigger);
interface SelectProps {
  label: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}


interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  description?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked = false, onChange, description }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <label className="flex items-start cursor-pointer group">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="sr-only"
        />
        <div className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center ${
          isChecked
            ? 'bg-blue-600 border-blue-600 scale-100'
            : 'bg-blue-50 border-blue-300 group-hover:border-blue-400'
        }`}>
          {isChecked && <Check className="w-3.5 h-3.5 text-white animate-in zoom-in duration-150" />}
        </div>
      </div>
      <div className="ml-3">
        <span className="text-sm font-medium text-neutral-700">{label}</span>
        {description && <p className="text-sm text-neutral-500 mt-0.5">{description}</p>}
      </div>
    </label>
  );
};

interface RadioProps {
  name: string;
  options: { value: string; label: string; description?: string }[];
  value?: string;
  onChange?: (value: string) => void;
}

const Radio: React.FC<RadioProps> = ({ name, options, value, onChange }) => {
  const [selected, setSelected] = useState(value || '');

  const handleChange = (optionValue: string) => {
    setSelected(optionValue);
    onChange?.(optionValue);
  };

  return (
    <div className="space-y-3">
      {options.map(option => (
        <label key={option.value} className="flex items-start cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <input
              type="radio"
              name={name}
              checked={selected === option.value}
              onChange={() => handleChange(option.value)}
              className="sr-only"
            />
            <div className={`w-5 h-5 border-2 rounded-full transition-all duration-200 flex items-center justify-center ${
              selected === option.value
                ? 'bg-blue-50 border-blue-600'
                : 'bg-blue-50 border-blue-300 group-hover:border-blue-400'
            }`}>
              {selected === option.value && (
                <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-in zoom-in duration-150" />
              )}
            </div>
          </div>
          <div className="ml-3">
            <span className="text-sm font-medium text-neutral-700">{option.label}</span>
            {option.description && <p className="text-sm text-neutral-500 mt-0.5">{option.description}</p>}
          </div>
        </label>
      ))}
    </div>
  );
};

interface SwitchProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  description?: string;
}

const Switch: React.FC<SwitchProps> = ({ label, checked = false, onChange, description }) => {
  const [isOn, setIsOn] = useState(checked);

  const handleToggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onChange?.(newValue);
  };

  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <div>
        <span className="text-sm font-medium text-neutral-700">{label}</span>
        {description && <p className="text-sm text-neutral-500 mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isOn ? 'bg-blue-600' : 'bg-blue-50'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-blue-50 transition-transform duration-200 ${
            isOn ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </label>
  );
};

interface DatePickerProps {
  label: string;
  value?: string;
  onChange?: (date: string) => void;
  error?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange, error }) => {
  const [date, setDate] = useState(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-2">{label}</label>
      <div className="relative">
        <input
          type="date"
          value={date}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 pr-10 bg-blue-50 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            error ? 'border-red-400' : 'border-blue-300'
          }`}
        />
        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
      </div>
      {error && (
        <div className="flex items-center mt-2 text-sm text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ label, type = 'text', placeholder, value, onChange, error, required }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [touched, setTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const showError = error && touched;

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 bg-blue-50 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          showError ? 'border-red-400' : 'border-blue-300'
        }`}
      />
      {showError && (
        <div className="flex items-center mt-2 text-sm text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

interface FormResultProps {
  type: 'success' | 'error';
  title: string;
  message: string;
  onClose: () => void;
}

const FormResult: React.FC<FormResultProps> = ({ type, title, message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-blue-50 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 animate-in zoom-in slide-in-from-bottom-4 duration-300">
        <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 ${
          type === 'success' ? 'bg-blue-50' : 'bg-blue-50'
        }`}>
          {type === 'success' ? (
            <Check className="w-8 h-8 text-green-600" />
          ) : (
            <AlertCircle className="w-8 h-8 text-red-600" />
          )}
        </div>
        <h3 className="text-2xl font-bold text-center mb-2 text-neutral-900">{title}</h3>
        <p className="text-neutral-600 text-center mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
        >
          Schließen
        </button>
      </div>
    </div>
  );
};

const HoneypotField: React.FC = () => {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      className="absolute -left-[9999px] w-0 h-0 opacity-0"
    />
  );
};

interface FormLoadingProps {
  message?: string;
}

const FormLoading: React.FC<FormLoadingProps> = ({ message = 'Submitting...' }) => {
  return (
    <div className="flex items-center justify-center py-4">
      <Loader2 className="w-6 h-6 text-blue-600 animate-spin mr-3" />
      <span className="text-neutral-600 font-medium">{message}</span>
    </div>
  );
};

export const AnmeldeFormular: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    geburtsdatum: '',
    klasse: '',
    starttermin: '',
    nachricht: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const fieldsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(".form-title",
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate form container
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate logo
      gsap.fromTo(logoRef.current,
        { opacity: 0, scale: 0.5, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate form fields with stagger
      gsap.fromTo(fieldsRef.current.filter(Boolean),
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate submit button
      gsap.fromTo(".submit-btn",
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.vorname.trim()) newErrors.vorname = 'Vorname ist erforderlich';
    if (!formData.nachname.trim()) newErrors.nachname = 'Nachname ist erforderlich';
    if (!formData.email.trim()) newErrors.email = 'E-Mail-Adresse ist erforderlich';
    if (!formData.telefon.trim()) newErrors.telefon = 'Telefonnummer ist erforderlich';
    return newErrors;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      // Mark all fields as touched to show errors
      const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
      setTouched(allTouched);
      return;
    }
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleInputBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const fieldErrors = validateForm();
    if (fieldErrors[field]) {
      setErrors(prev => ({ ...prev, [field]: fieldErrors[field] }));
    }
  };

  return (
    <section ref={sectionRef} className="py-16">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        <h2 className="form-title text-3xl font-bold text-heading mb-8 text-center">Jetzt Anmelden</h2>
        <div className="max-w-2xl mx-auto relative">
          <div ref={formRef} className="border border-primary-200 rounded-xl p-8 bg-card-bg filter grayscale-50 relative">
            {formState === 'idle' && (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <HoneypotField />
                <fieldset className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-heading">Persönliche Informationen</h3>
                    <img ref={logoRef} src={logo} alt="Logo" className="h-16 w-auto" />
                  </div>
                  <div ref={(el) => el && (fieldsRef.current[0] = el)}>
                    <Input
                      label="Vorname"
                      placeholder="Max"
                      required
                      value={formData.vorname}
                      onChange={(value) => handleInputChange('vorname', value)}
                      error={touched.vorname ? errors.vorname : ''}
                    />
                  </div>
                  <div ref={(el) => el && (fieldsRef.current[1] = el)}>
                    <Input
                      label="Nachname"
                      placeholder="Mustermann"
                      required
                      value={formData.nachname}
                      onChange={(value) => handleInputChange('nachname', value)}
                      error={touched.nachname ? errors.nachname : ''}
                    />
                  </div>
                  <div ref={(el) => el && (fieldsRef.current[2] = el)}>
                    <Input
                      label="E-Mail-Adresse"
                      type="email"
                      placeholder="max@example.com"
                      required
                      value={formData.email}
                      onChange={(value) => handleInputChange('email', value)}
                      error={touched.email ? errors.email : ''}
                    />
                  </div>
                  <div ref={(el) => el && (fieldsRef.current[3] = el)}>
                    <Input
                      label="Telefonnummer"
                      type="tel"
                      placeholder="+49 123 456789"
                      required
                      value={formData.telefon}
                      onChange={(value) => handleInputChange('telefon', value)}
                      error={touched.telefon ? errors.telefon : ''}
                    />
                  </div>
                  <div ref={(el) => el && (fieldsRef.current[4] = el)}>
                    <DatePicker
                      label="Geburtsdatum"
                      value={formData.geburtsdatum}
                      onChange={(value) => handleInputChange('geburtsdatum', value)}
                    />
                  </div>
                </fieldset>

                <fieldset className="space-y-4">
                  <legend className="text-lg font-semibold text-heading mb-4">Kursdetails</legend>
                  <div ref={(el) => el && (fieldsRef.current[5] = el)}>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Gewünschte Klasse</label>
                    <div className="relative">
                      <select
                        value={formData.klasse}
                        onChange={(e) => handleInputChange('klasse', e.target.value)}
                        className="w-full px-4 py-2.5 pr-10 bg-blue-50 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-neutral-900 appearance-none"
                      >
                        <option value="a">Klasse A (Motorrad)</option>
                        <option value="b">Klasse B (Auto)</option>
                        <option value="c">Klasse C (LKW)</option>
                        <option value="d">Klasse D (Bus)</option>
                        <option value="l">Klasse L (Landwirtschaft)</option>
                        <option value="t">Klasse T (Traktor)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>
                  <div ref={(el) => el && (fieldsRef.current[6] = el)}>
                    <DatePicker
                      label="Gewünschter Starttermin"
                      value={formData.starttermin}
                      onChange={(value) => handleInputChange('starttermin', value)}
                    />
                  </div>
                </fieldset>

                <fieldset className="space-y-4">
                  <legend className="text-lg font-semibold text-heading mb-4">Zusätzliche Informationen</legend>
                  <div ref={(el) => el && (fieldsRef.current[7] = el)}>
                    <label className="block text-sm font-medium text-text-body mb-2">Zusätzliche Nachricht</label>
                    <textarea
                      className="w-full px-3 py-2 border border-field-border rounded-lg focus:ring-2 focus:ring-field-focus-ring focus:border-transparent bg-field-bg text-field-fg placeholder-field-placeholder"
                      rows={4}
                      placeholder="Ihre Nachricht..."
                      value={formData.nachricht}
                      onChange={(e) => handleInputChange('nachricht', e.target.value)}
                    />
                  </div>
                </fieldset>

                <button
                  type="submit"
                  disabled={true}
                  className="submit-btn w-full py-3 bg-primary-500 text-white rounded-lg font-semibold shadow-lg hover:bg-primary-600 transition-colors duration-200 disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anmeldung abschicken
                </button>
              </form>
            )}

            {formState === 'loading' && <FormLoading message="Anmeldung wird verarbeitet..." />}
          </div>
        </div>
      </div>
      {formState === 'success' && (
        <FormResult
          type="success"
          title="Anmeldung erfolgreich!"
          message="Ihre Anmeldung wurde erfolgreich übermittelt. Wir melden uns bald bei Ihnen."
          onClose={() => setFormState('idle')}
        />
      )}
    </section>
  );
};