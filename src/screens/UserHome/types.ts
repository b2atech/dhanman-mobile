export type VisitorDummy = {
  id: string;
  name: string;
  photo: string;
  status: 'in' | 'out';
  time: string;
};

export type TimelineVisitorsProps = {
  visitors: VisitorDummy[];
};
