export type Visitor = {
  id: string;
  name: string;
  photo: string;
  status: 'in' | 'out';
  time: string;
};

export type TimelineVisitorsProps = {
  visitors: Visitor[];
};