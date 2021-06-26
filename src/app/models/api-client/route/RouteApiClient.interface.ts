import { Route } from '../../domains/route.domain';

export interface RouteApiClientInterface {
  /**
   * Obtain a certain route
   * @param id - Id of route to get
   */
  get(id: string): Promise<Route>;

  /**
    Return all routes in database.
   */
  getRoutes(): Promise<Route[]>;


  getFilterRoutes(difficult: string, duration: string): Promise<Route[]>;

  /**
   * Insert a route in database
   * @param route
   */
  insertRoute(route: Route): Promise<Route>;

  /**
   * Update a new route in database.
   * @param route
   */
  updateRoute(route: Route): Promise<Route>;

  /**
   * Delete a certain route.
   * @param id
   */
  deleteRoute(id: string): Promise<void>;
}
