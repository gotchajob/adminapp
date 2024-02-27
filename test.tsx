interface DashboardOrder {
  order: DashboardService
  serviceDetails: DashboardService[];
}

interface DashboardService {
  total: number;
  totalRevenue: number;
  detail: number[];
  serviceName: string;
}
