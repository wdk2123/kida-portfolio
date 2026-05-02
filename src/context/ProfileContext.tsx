import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProfileState {
  name: string;
  title: string;
  tagline: string;
  email: string;
  location: string;
  phone: string;
  photoUrl: string;
  github: string;
  linkedin: string;
  twitter: string;
}

const defaultProfile: ProfileState = {
  name: 'Kidan Dibekulu',
  title: 'Full-Stack Developer & Electrical and Computer Engineer',
  tagline: 'I am an Electrical and Computer Engineer passionate about web development and IT-related fields. I build modern, responsive web applications using React, Django, and cutting-edge technologies.',
  email: 'kidandibekulu0@gmail.com',
  location: 'Addis Ababa, Ethiopia',
  phone: '+251 925740648',
  photoUrl: '',
  github: 'https://github.com/wdk2123',
  linkedin: 'https://www.linkedin.com/in/kidan-dibekulu-509399331/',
  twitter: 'https://twitter.com',
};

interface ProfileContextType {
  profile: ProfileState;
  updateProfile: (data: Partial<ProfileState>) => void;
  updatePhoto: (file: File) => Promise<void>;
  removePhoto: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileState>(() => {
    const saved = localStorage.getItem('profile');
    return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (data: Partial<ProfileState>) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  const updatePhoto = async (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setProfile(prev => ({ ...prev, photoUrl: base64 }));
        resolve();
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = () => {
    setProfile(prev => ({ ...prev, photoUrl: '' }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, updatePhoto, removePhoto }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile must be used within ProfileProvider');
  return context;
}
