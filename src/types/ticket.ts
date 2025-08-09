export interface Ticket {
  id: number;
  apartmentId: number;
  title: string;
  description: string;
  unitId: number;
  ticketCategoryId: number;
  ticketCategory?: string;
  ticketPriorityId: number;
  ticketPriority?: string;
  ticketStatusId: number;
  ticketStatus?: string;
  createdBy: string;
  createdOnUtc: string;
  modifiedBy?: string;
  modifiedOnUtc?: string;
  assignedTo?: string;
  resolvedOnUtc?: string;
  closedOnUtc?: string;
}

export interface TicketCategory {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface TicketPriority {
  id: number;
  name: string;
  level: number;
  isActive: boolean;
}

export interface TicketsResponse {
  cursor?: string;
  items: Ticket[];
}

export interface TicketCategoriesResponse {
  cursor?: string;
  items: TicketCategory[];
}

export interface TicketPrioritiesResponse {
  cursor?: string;
  items: TicketPriority[];
}

export interface CreateTicketRequest {
  apartmentId: number;
  title: string;
  unitId: number;
  description: string;
  ticketCategoryId: number;
  ticketPriorityId: number;
  ticketStatusId: number;
}