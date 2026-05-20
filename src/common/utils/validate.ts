import * as z from 'zod';

interface Inputs {
  limitParam: string;
  orderParam: string;
  pageParam: string;
  route: 'articles' | 'features' | 'films' | 'people' | 'studios';
}

/** Validate and return coerced URL search params. */
export function validateParams({
  route,
  limitParam,
  pageParam,
  orderParam,
}: Inputs) {
  // Validate pagination limit
  const Limit = z.literal(['10', '25']);
  const { success: validLimit } = Limit.safeParse(limitParam);

  // Validate page
  const Page = z.coerce.number().int().positive();
  const { success: validPage } = Page.safeParse(pageParam);

  // Validate orderBy
  const NameOrder = z.literal(['nameAsc', 'nameDesc']);
  const PeopleOrder = z.literal([
    'firstNameAsc',
    'firstNameDesc',
    'lastNameAsc',
    'lastNameDesc',
  ]);
  const FilmOrder = z.literal(['nameAsc', 'nameDesc', 'yearAsc', 'yearDesc']);

  let validOrder: string;

  switch (route) {
    case 'articles':
    case 'features':
    case 'studios': {
      const { success } = NameOrder.safeParse(orderParam);
      validOrder = success ? orderParam : 'nameAsc';
      break;
    }

    case 'films': {
      const { success } = FilmOrder.safeParse(orderParam);
      validOrder = success ? orderParam : 'nameAsc';
      break;
    }

    case 'people': {
      const { success } = PeopleOrder.safeParse(orderParam);
      validOrder = success ? orderParam : 'lastNameAsc';
      break;
    }
  }

  const params = {
    limit: validLimit ? Number(limitParam) : 10,
    page: validPage ? Number(pageParam) : 1,
    orderBy: validOrder,
  };

  return params;
}
