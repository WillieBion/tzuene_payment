export interface Payout {
    depositId: string
    amount: string
    currency: string
    correspondent: string
    payer: Payer
    customerTimestamp: string
    statementDescription: string
    country: string
    preAuthorisationCode?: string
    metadata: Metadaum[]
  }
  
  export interface Payer {
    address: Address
    type: string
  }
  
  export interface Address {
    value: string
  }
  
  export interface Metadaum {
    fieldName: string
    fieldValue: string
    isPII?: boolean
  }
  