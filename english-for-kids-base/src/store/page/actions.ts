export const UPDATE_PAGE = 'UPDATE_PAGE';

interface PageCategoryAction {
  type: string;
  text: string;
}

export const updateCategory = (text: string): PageCategoryAction => ({
  type: UPDATE_PAGE,
  text,
});
