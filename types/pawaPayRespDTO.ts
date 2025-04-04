export interface PawaPayResponseDTO {
    depositId: string
    status: string
    created?: string
    rejectionReason?: RejectionReason
}


interface RejectionReason {
    rejectionCode: string
    rejectionMessage: string
}

export enum Status {
    ACCEPTED,
    REJECTED,
    DUPLICATE_IGNORED
}