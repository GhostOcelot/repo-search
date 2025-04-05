interface Name {
  language: string
  text: string
}

export interface Country {
  isoCode: string
  name: Name[]
  officialLanguages: string[]
}

export interface Holiday {
  name: Name[]
  id: string
  startDate: string
  endDate: string
  nationwide: boolean
  regionalScope: string
  temporalScope: string
  type: string
}
