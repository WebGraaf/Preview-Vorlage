# JSON Configuration Schema for Driving School Website

## Table of Contents
1. [Current Structure Analysis](#current-structure-analysis)
2. [JSON Schema Design](#json-schema-design)
3. [Complete Field Documentation](#complete-field-documentation)
4. [Example Configurations](#example-configurations)
5. [Implementation Plan](#implementation-plan)

---

## 1. Current Structure Analysis

### 1.1 Overview of Current Architecture

The driving school website is built with React + TypeScript and uses React Router for navigation. The current implementation has **hardcoded data** throughout the components that should be made configurable.

### 1.2 Component Data Analysis

#### 1.2.1 Header Component ([`src/components/Header.tsx`](../src/components/Header.tsx))

**Hardcoded Values:**
- Logo path: `/default_images/logo_default.webp`
- Phone number: `0123 456789`
- Email: `info@fuehrerschein.de`
- Location: `Berlin`
- Navigation menu items (Führerscheine subpages)

**Configurable Data Needed:**
- `drivingSchool.logo`
- `drivingSchool.contact.phone`
- `drivingSchool.contact.email`
- `drivingSchool.locations[0].city` (primary location)
- `licenseClasses` (to dynamically generate navigation)

#### 1.2.2 Home Page ([`src/pages/Home.tsx`](../src/pages/Home.tsx))

**Hardcoded Values:**
- Hero section: title, subtitle, description, button text
- Gallery images array
- Locations array with addresses, phone numbers, hours, map URLs
- FAQ items

**Configurable Data Needed:**
- `drivingSchool.name`
- `drivingSchool.logo`
- `locations[]` array
- License classes for overview grid

#### 1.2.3 Führerscheine Overview ([`src/pages/Fuehrerscheine.tsx`](../src/pages/Fuehrerscheine.tsx))

**Hardcoded Values:**
- All 6 main license classes (A, B, C, D, L, T)
- Each class has: label, title, content, link, subclasses[]

**Configurable Data Needed:**
- `licenseClasses[]` - only classes offered by the driving school

#### 1.2.4 License Class Pages (KlasseA, KlasseB, etc.)

**Hardcoded Values:**
- Page titles and descriptions
- Subclass details (AM, A1, A2, A for Class A)
- Images for each subclass
- Restrictions/requirements lists
- Info card data (age, speed, power, etc.)

**Configurable Data Needed:**
- `licenseClasses[].enabled` - whether to show this class
- `licenseClasses[].subclasses[].enabled` - which subclasses to show

#### 1.2.5 Kontakt Page ([`src/pages/Kontakt.tsx`](../src/pages/Kontakt.tsx))

**Hardcoded Values:**
- Location data (addresses, phones, hours, map URLs)

**Configurable Data Needed:**
- `locations[]` array

#### 1.2.6 StandorteUebersicht Component ([`src/components/StandorteUebersicht.tsx`](../src/components/StandorteUebersicht.tsx))

**Interface Already Defined:**
```typescript
interface Location {
  label: string;
  address: string;
  phone: string;
  hours: string;
  mapSrc: string;
}
```

### 1.3 License Class Hierarchy

The complete hierarchy of main classes and their subclasses:

```
├── Klasse A (Motorrad/Motorcycle)
│   ├── AM - Kleinkrafträder/Mofas bis 45 km/h
│   ├── A1 - Leichtkrafträder bis 125 ccm / 11 kW
│   ├── A2 - Motorräder bis 35 kW / 0,2 kW/kg
│   └── A  - Alle Motorräder ohne Leistungsbeschränkung
│
├── Klasse B (PKW/Car)
│   ├── BF17 - Begleitetes Fahren ab 17
│   ├── B    - Pkw bis 3,5 t zGG / max. 8 Sitzplätze
│   ├── B96  - Pkw-Kombi bis 4,25 t zGG
│   ├── BE   - Pkw + Anhänger > 750 kg
│   ├── B196 - Erweiterung B: Motorräder bis 125 ccm (A1)
│   └── B197 - Automatikprüfung mit Schaltkompetenz
│
├── Klasse C (LKW/Truck)
│   ├── C1  - 3,5 – 7,5 t zGG, Anhänger ≤ 750 kg
│   ├── C1E - C1 + Anhänger > 750 kg (bis 12 t Gesamt)
│   ├── C   - > 3,5 t zGG, Anhänger ≤ 750 kg
│   └── CE  - C + Anhänger > 750 kg
│
├── Klasse D (Bus)
│   ├── D1  - 9–16 Sitzplätze, max. 8 m Länge
│   ├── D1E - D1 + Anhänger > 750 kg
│   ├── D   - Bus mit mehr als 8 Sitzplätzen
│   └── DE  - D + Anhänger > 750 kg
│
├── Klasse L (Land-/Forstwirtschaft langsam)
│   └── L   - Zugmaschinen bis 40 km/h bbH
│
└── Klasse T (Land-/Forstwirtschaft schnell)
    └── T   - Zugmaschinen bis 60 km/h bbH
```

---

## 2. JSON Schema Design

### 2.1 Design Principles

1. **Minimal Configuration**: Only include data that varies between customers
2. **No Static Text**: Descriptions, legal requirements, and UI text remain in code
3. **Selective Classes**: Support enabling/disabling specific license classes and subclasses
4. **Multiple Locations**: Support variable number of locations
5. **Type Safety**: Schema designed for TypeScript integration

### 2.2 Complete JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Driving School Configuration",
  "type": "object",
  "required": ["drivingSchool", "locations", "licenseClasses"],
  "properties": {
    "drivingSchool": {
      "type": "object",
      "required": ["name", "logo", "contact"],
      "properties": {
        "name": {
          "type": "string",
          "description": "Name of the driving school"
        },
        "logo": {
          "type": "string",
          "description": "Path to logo image (relative to public folder)"
        },
        "contact": {
          "type": "object",
          "required": ["phone", "email"],
          "properties": {
            "phone": {
              "type": "string",
              "description": "Primary phone number"
            },
            "email": {
              "type": "string",
              "format": "email",
              "description": "Primary email address"
            }
          }
        }
      }
    },
    "locations": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["id", "name", "address", "phone", "email", "hours", "googleMapsUrl"],
        "properties": {
          "id": {
            "type": "string",
            "description": "Unique identifier for the location"
          },
          "name": {
            "type": "string",
            "description": "Display name for the location (e.g., 'Hauptstandort Berlin-Mitte')"
          },
          "address": {
            "type": "object",
            "required": ["street", "postalCode", "city"],
            "properties": {
              "street": {
                "type": "string",
                "description": "Street name and number"
              },
              "postalCode": {
                "type": "string",
                "description": "Postal/ZIP code"
              },
              "city": {
                "type": "string",
                "description": "City name"
              }
            }
          },
          "phone": {
            "type": "string",
            "description": "Phone number for this location"
          },
          "email": {
            "type": "string",
            "format": "email",
            "description": "Email address for this location"
          },
          "hours": {
            "type": "object",
            "description": "Opening hours",
            "properties": {
              "weekdays": {
                "type": "string",
                "description": "Weekday hours (e.g., 'Mo-Fr: 9:00-18:00')"
              },
              "saturday": {
                "type": "string",
                "description": "Saturday hours (e.g., 'Sa: 10:00-14:00')"
              },
              "sunday": {
                "type": "string",
                "description": "Sunday hours (e.g., 'So: Geschlossen')"
              }
            }
          },
          "googleMapsUrl": {
            "type": "string",
            "format": "uri",
            "description": "Google Maps embed URL for the location"
          },
          "isPrimary": {
            "type": "boolean",
            "default": false,
            "description": "Whether this is the primary/main location"
          }
        }
      }
    },
    "licenseClasses": {
      "type": "object",
      "description": "Configuration for which license classes are offered",
      "properties": {
        "A": {
          "$ref": "#/definitions/licenseClassConfig"
        },
        "B": {
          "$ref": "#/definitions/licenseClassConfig"
        },
        "C": {
          "$ref": "#/definitions/licenseClassConfig"
        },
        "D": {
          "$ref": "#/definitions/licenseClassConfig"
        },
        "L": {
          "$ref": "#/definitions/licenseClassConfig"
        },
        "T": {
          "$ref": "#/definitions/licenseClassConfig"
        }
      }
    }
  },
  "definitions": {
    "licenseClassConfig": {
      "type": "object",
      "required": ["enabled"],
      "properties": {
        "enabled": {
          "type": "boolean",
          "description": "Whether this license class is offered"
        },
        "subclasses": {
          "type": "object",
          "description": "Configuration for subclasses",
          "additionalProperties": {
            "type": "object",
            "properties": {
              "enabled": {
                "type": "boolean",
                "description": "Whether this subclass is offered"
              },
              "customImage": {
                "type": "string",
                "description": "Optional custom image path (uses default if not specified)"
              }
            }
          }
        }
      }
    }
  }
}
```

---

## 3. Complete Field Documentation

### 3.1 Root Level Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `drivingSchool` | object | Yes | Core driving school information |
| `locations` | array | Yes | Array of location objects (min 1) |
| `licenseClasses` | object | Yes | License class configuration |

### 3.2 Driving School Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `drivingSchool.name` | string | Yes | Name of the driving school (e.g., "Fahrschule Müller") |
| `drivingSchool.logo` | string | Yes | Path to logo image relative to public folder |
| `drivingSchool.contact.phone` | string | Yes | Primary phone number displayed in header |
| `drivingSchool.contact.email` | string | Yes | Primary email address displayed in header |

### 3.3 Location Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (e.g., "berlin-mitte") |
| `name` | string | Yes | Display name (e.g., "Hauptstandort Berlin-Mitte") |
| `address.street` | string | Yes | Street and number (e.g., "Hauptstraße 123") |
| `address.postalCode` | string | Yes | Postal code (e.g., "10115") |
| `address.city` | string | Yes | City name (e.g., "Berlin") |
| `phone` | string | Yes | Location phone number |
| `email` | string | Yes | Location email address |
| `hours.weekdays` | string | No | Weekday hours (e.g., "Mo-Fr: 9:00-18:00") |
| `hours.saturday` | string | No | Saturday hours |
| `hours.sunday` | string | No | Sunday hours |
| `googleMapsUrl` | string | Yes | Google Maps embed URL |
| `isPrimary` | boolean | No | Whether this is the main location (default: false) |

### 3.4 License Classes Configuration

#### Main Classes

| Class | Subclasses | Description |
|-------|------------|-------------|
| `A` | AM, A1, A2, A | Motorcycle licenses |
| `B` | BF17, B, B96, BE, B196, B197 | Car licenses |
| `C` | C1, C1E, C, CE | Truck licenses |
| `D` | D1, D1E, D, DE | Bus licenses |
| `L` | L | Agricultural (slow) |
| `T` | T | Agricultural (fast) |

#### License Class Config Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `enabled` | boolean | Yes | Whether this main class is offered |
| `subclasses` | object | No | Subclass configurations |
| `subclasses.[code].enabled` | boolean | No | Whether this subclass is offered |
| `subclasses.[code].customImage` | string | No | Custom image path (optional) |

### 3.5 Subclass Reference

#### Class A Subclasses
| Code | Default Image | Description |
|------|---------------|-------------|
| `AM` | `/default_images/Klasse_AM_Default.webp` | Kleinkrafträder/Mofas bis 45 km/h |
| `A1` | `/default_images/Klasse_A1_Default.webp` | Leichtkrafträder bis 125 ccm / 11 kW |
| `A2` | `/default_images/Klasse_A2_Default.webp` | Motorräder bis 35 kW / 0,2 kW/kg |
| `A` | `/default_images/Klasse_A_Default.webp` | Alle Motorräder ohne Leistungsbeschränkung |

#### Class B Subclasses
| Code | Default Image | Description |
|------|---------------|-------------|
| `BF17` | `/default_images/Klasse_BF17_Default.webp` | Begleitetes Fahren ab 17 |
| `B` | `/default_images/Klasse_B_Default.webp` | Pkw bis 3,5 t zGG |
| `B96` | `/default_images/Klasse_B96_Default.webp` | Pkw-Kombi bis 4,25 t zGG |
| `BE` | `/default_images/Klasse_BE_Default.webp` | Pkw + Anhänger > 750 kg |
| `B196` | N/A | Erweiterung B: Motorräder bis 125 ccm |
| `B197` | `/default_images/Klasse_B197_Default.webp` | Automatikprüfung mit Schaltkompetenz |

#### Class C Subclasses
| Code | Default Image | Description |
|------|---------------|-------------|
| `C1` | `/default_images/Klasse_C1_Default.webp` | 3,5 – 7,5 t zGG |
| `C1E` | `/default_images/Klasse_C1E_Default.webp` | C1 + Anhänger > 750 kg |
| `C` | `/default_images/Klasse_C_Default.webp` | > 3,5 t zGG |
| `CE` | `/default_images/Klasse_CE_Default.webp` | C + Anhänger > 750 kg |

#### Class D Subclasses
| Code | Default Image | Description |
|------|---------------|-------------|
| `D1` | `/default_images/Klasse_D1_Default.webp` | 9–16 Sitzplätze, max. 8 m |
| `D1E` | `/default_images/Klasse_D1E_Default.webp` | D1 + Anhänger > 750 kg |
| `D` | `/default_images/Klasse_D_Default.webp` | Bus > 8 Sitzplätze |
| `DE` | `/default_images/Klasse_DE_Default.webp` | D + Anhänger > 750 kg |

#### Class L Subclasses
| Code | Default Image | Description |
|------|---------------|-------------|
| `L` | `/default_images/Klasse_L_Default.webp` | Zugmaschinen bis 40 km/h bbH |

#### Class T Subclasses
| Code | Default Image | Description |
|------|---------------|-------------|
| `T` | `/default_images/Klasse_T_Default.webp` | Zugmaschinen bis 60 km/h bbH |

---

## 4. Example Configurations

### 4.1 Full Configuration (All Classes)

```json
{
  "drivingSchool": {
    "name": "Fahrschule Müller",
    "logo": "/kunde_bilder/logo.webp",
    "contact": {
      "phone": "+49 30 12345678",
      "email": "info@fahrschule-mueller.de"
    }
  },
  "locations": [
    {
      "id": "berlin-mitte",
      "name": "Hauptstandort Berlin-Mitte",
      "address": {
        "street": "Hauptstraße 123",
        "postalCode": "10115",
        "city": "Berlin"
      },
      "phone": "+49 30 12345678",
      "email": "mitte@fahrschule-mueller.de",
      "hours": {
        "weekdays": "Mo-Fr: 9:00-18:00",
        "saturday": "Sa: 10:00-14:00",
        "sunday": "So: Geschlossen"
      },
      "googleMapsUrl": "https://maps.google.com/maps?q=Hauptstra%C3%9Fe%20123,%2010115%20Berlin&t=&z=15&ie=UTF8&iwloc=&output=embed",
      "isPrimary": true
    },
    {
      "id": "berlin-kreuzberg",
      "name": "Standort Berlin-Kreuzberg",
      "address": {
        "street": "Kreuzstraße 45",
        "postalCode": "10965",
        "city": "Berlin"
      },
      "phone": "+49 30 98765432",
      "email": "kreuzberg@fahrschule-mueller.de",
      "hours": {
        "weekdays": "Mo-Fr: 9:00-18:00",
        "saturday": "Sa: Geschlossen",
        "sunday": "So: Geschlossen"
      },
      "googleMapsUrl": "https://maps.google.com/maps?q=Kreuzstra%C3%9Fe%2045,%2010965%20Berlin&t=&z=15&ie=UTF8&iwloc=&output=embed",
      "isPrimary": false
    }
  ],
  "licenseClasses": {
    "A": {
      "enabled": true,
      "subclasses": {
        "AM": { "enabled": true },
        "A1": { "enabled": true },
        "A2": { "enabled": true },
        "A": { "enabled": true }
      }
    },
    "B": {
      "enabled": true,
      "subclasses": {
        "BF17": { "enabled": true },
        "B": { "enabled": true },
        "B96": { "enabled": true },
        "BE": { "enabled": true },
        "B196": { "enabled": false },
        "B197": { "enabled": true }
      }
    },
    "C": {
      "enabled": true,
      "subclasses": {
        "C1": { "enabled": true },
        "C1E": { "enabled": true },
        "C": { "enabled": true },
        "CE": { "enabled": true }
      }
    },
    "D": {
      "enabled": true,
      "subclasses": {
        "D1": { "enabled": true },
        "D1E": { "enabled": true },
        "D": { "enabled": true },
        "DE": { "enabled": true }
      }
    },
    "L": {
      "enabled": true,
      "subclasses": {
        "L": { "enabled": true }
      }
    },
    "T": {
      "enabled": true,
      "subclasses": {
        "T": { "enabled": true }
      }
    }
  }
}
```

### 4.2 Minimal Configuration (Only Class A with A1, and Class B with BE)

```json
{
  "drivingSchool": {
    "name": "Kleine Fahrschule Schmidt",
    "logo": "/kunde_bilder/logo-schmidt.webp",
    "contact": {
      "phone": "+49 40 5551234",
      "email": "info@fahrschule-schmidt.de"
    }
  },
  "locations": [
    {
      "id": "hamburg-zentrum",
      "name": "Fahrschule Schmidt Hamburg",
      "address": {
        "street": "Mönckebergstraße 7",
        "postalCode": "20095",
        "city": "Hamburg"
      },
      "phone": "+49 40 5551234",
      "email": "info@fahrschule-schmidt.de",
      "hours": {
        "weekdays": "Mo-Fr: 10:00-17:00",
        "saturday": "Sa: Nach Vereinbarung",
        "sunday": "So: Geschlossen"
      },
      "googleMapsUrl": "https://maps.google.com/maps?q=M%C3%B6nckebergstra%C3%9Fe%207,%2020095%20Hamburg&t=&z=15&ie=UTF8&iwloc=&output=embed",
      "isPrimary": true
    }
  ],
  "licenseClasses": {
    "A": {
      "enabled": true,
      "subclasses": {
        "AM": { "enabled": false },
        "A1": { "enabled": true },
        "A2": { "enabled": false },
        "A": { "enabled": false }
      }
    },
    "B": {
      "enabled": true,
      "subclasses": {
        "BF17": { "enabled": false },
        "B": { "enabled": true },
        "B96": { "enabled": false },
        "BE": { "enabled": true },
        "B196": { "enabled": false },
        "B197": { "enabled": false }
      }
    },
    "C": {
      "enabled": false
    },
    "D": {
      "enabled": false
    },
    "L": {
      "enabled": false
    },
    "T": {
      "enabled": false
    }
  }
}
```

---

## 5. Implementation Plan

### 5.1 File Structure

```
src/
├── config/
│   ├── config.json              # Customer-specific configuration
│   ├── config.schema.json       # JSON Schema for validation
│   ├── configTypes.ts           # TypeScript interfaces
│   ├── configLoader.ts          # Configuration loading utilities
│   └── licenseClassData.ts      # Static license class data (descriptions, requirements)
├── hooks/
│   └── useConfig.ts             # React hook for accessing config
├── context/
│   └── ConfigContext.tsx        # React context for config
```

### 5.2 TypeScript Interfaces

```typescript
// src/config/configTypes.ts

export interface DrivingSchoolConfig {
  drivingSchool: DrivingSchool;
  locations: Location[];
  licenseClasses: LicenseClassesConfig;
}

export interface DrivingSchool {
  name: string;
  logo: string;
  contact: {
    phone: string;
    email: string;
  };
}

export interface Location {
  id: string;
  name: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
  };
  phone: string;
  email: string;
  hours: {
    weekdays?: string;
    saturday?: string;
    sunday?: string;
  };
  googleMapsUrl: string;
  isPrimary?: boolean;
}

export interface LicenseClassesConfig {
  A?: LicenseClassConfig;
  B?: LicenseClassConfig;
  C?: LicenseClassConfig;
  D?: LicenseClassConfig;
  L?: LicenseClassConfig;
  T?: LicenseClassConfig;
}

export interface LicenseClassConfig {
  enabled: boolean;
  subclasses?: {
    [key: string]: SubclassConfig;
  };
}

export interface SubclassConfig {
  enabled: boolean;
  customImage?: string;
}

export type MainLicenseClass = 'A' | 'B' | 'C' | 'D' | 'L' | 'T';
```

### 5.3 Dynamic Routing Implementation

```typescript
// src/App.tsx - Dynamic routing based on config

import { useConfig } from './hooks/useConfig';

const App: React.FC = () => {
  const { licenseClasses } = useConfig();
  
  // Get enabled main classes
  const enabledClasses = Object.entries(licenseClasses)
    .filter(([_, config]) => config?.enabled)
    .map(([className]) => className);

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Only render Führerscheine route if any class is enabled */}
          {enabledClasses.length > 0 && (
            <Route path="/fuehrerscheine" element={<Fuehrerscheine />} />
          )}
          
          {/* Dynamic license class routes */}
          {enabledClasses.includes('A') && (
            <Route path="/fuehrerscheine/klasse-a" element={<KlasseA />} />
          )}
          {enabledClasses.includes('B') && (
            <Route path="/fuehrerscheine/klasse-b" element={<KlasseB />} />
          )}
          {enabledClasses.includes('C') && (
            <Route path="/fuehrerscheine/klasse-c" element={<KlasseC />} />
          )}
          {enabledClasses.includes('D') && (
            <Route path="/fuehrerscheine/klasse-d" element={<KlasseD />} />
          )}
          {enabledClasses.includes('L') && (
            <Route path="/fuehrerscheine/klasse-l" element={<KlasseL />} />
          )}
          {enabledClasses.includes('T') && (
            <Route path="/fuehrerscheine/klasse-t" element={<KlasseT />} />
          )}
          
          <Route path="/anmelden" element={<Anmelden />} />
          <Route path="/ueber-uns" element={<UeberUns />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};
```

### 5.4 Config Context Implementation

```typescript
// src/context/ConfigContext.tsx

import React, { createContext, useContext, ReactNode } from 'react';
import { DrivingSchoolConfig } from '../config/configTypes';
import configData from '../config/config.json';

const ConfigContext = createContext<DrivingSchoolConfig | null>(null);

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ConfigContext.Provider value={configData as DrivingSchoolConfig}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = (): DrivingSchoolConfig => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
```

### 5.5 Header Component Update

```typescript
// src/components/Header.tsx - Updated to use config

import { useConfig } from '../hooks/useConfig';

const Header: React.FC = () => {
  const { drivingSchool, licenseClasses, locations } = useConfig();
  
  // Get primary location or first location
  const primaryLocation = locations.find(l => l.isPrimary) || locations[0];
  
  // Generate navigation items based on enabled classes
  const fuehrerscheineSubpages = Object.entries(licenseClasses)
    .filter(([_, config]) => config?.enabled)
    .map(([className]) => ({
      name: `Klasse ${className}`,
      path: `/fuehrerscheine/klasse-${className.toLowerCase()}`
    }));

  return (
    <header>
      {/* Logo */}
      <img src={drivingSchool.logo} alt={drivingSchool.name} />
      
      {/* Contact info */}
      <span>{drivingSchool.contact.phone}</span>
      <span>{drivingSchool.contact.email}</span>
      <span>{primaryLocation.address.city}</span>
      
      {/* Navigation with dynamic subpages */}
      {/* ... */}
    </header>
  );
};
```

### 5.6 Static License Class Data

```typescript
// src/config/licenseClassData.ts
// This file contains static data that doesn't change between customers

export const LICENSE_CLASS_DATA = {
  A: {
    title: 'Motorrad-Führerscheine',
    pageTitle: 'Motorrad Führerschein (Klasse A)',
    description: 'Entdecke die Freiheit auf zwei Rädern!',
    subclasses: {
      AM: {
        title: 'Klasse AM',
        description: 'Der Einstieg in die Welt der Zweiräder!...',
        restrictions: [
          'Mindestalter: 15 Jahre',
          'Maximale Geschwindigkeit: 45 km/h',
          // ...
        ],
        defaultImage: '/default_images/Klasse_AM_Default.webp'
      },
      A1: {
        title: 'Klasse A1',
        description: 'Mehr Leistung, mehr Möglichkeiten!...',
        restrictions: [
          'Mindestalter: 16 Jahre',
          // ...
        ],
        defaultImage: '/default_images/Klasse_A1_Default.webp'
      },
      // ... other subclasses
    }
  },
  // ... other main classes
};
```

### 5.7 Implementation Steps

1. **Phase 1: Setup Configuration Infrastructure**
   - Create `src/config/` directory structure
   - Define TypeScript interfaces
   - Create ConfigContext and useConfig hook
   - Add config.json with initial data

2. **Phase 2: Update Header Component**
   - Replace hardcoded values with config data
   - Generate dynamic navigation based on enabled classes

3. **Phase 3: Update App.tsx Routing**
   - Implement conditional routing based on enabled classes
   - Wrap app with ConfigProvider

4. **Phase 4: Update Location Components**
   - Update StandorteUebersicht to use config locations
   - Update Kontaktinformationen to use config locations
   - Update Home page locations section

5. **Phase 5: Update License Class Pages**
   - Create utility functions to filter enabled subclasses
   - Update each KlasseX page to only show enabled subclasses
   - Update Fuehrerscheine overview to only show enabled classes

6. **Phase 6: Update Overview Components**
   - Update KlassenUebersicht to filter by enabled classes
   - Update KlassenUebersichtGridSpotlight to filter by enabled classes

7. **Phase 7: Testing & Validation**
   - Test with full configuration
   - Test with minimal configuration
   - Validate JSON schema
   - Test all navigation paths

---

## Summary

This JSON configuration schema provides a **minimal yet comprehensive** approach to customizing the driving school website for different customers. Key features:

1. **Customer-specific data only**: Logo, name, contact info, locations
2. **Selective license classes**: Enable/disable main classes and individual subclasses
3. **Multiple locations support**: Variable number of locations with full details
4. **Type-safe**: Full TypeScript support with interfaces
5. **Backward compatible**: Default images and static text remain in code

The implementation plan provides a clear path to making the website fully configurable while maintaining clean separation between customer-specific data and static content.