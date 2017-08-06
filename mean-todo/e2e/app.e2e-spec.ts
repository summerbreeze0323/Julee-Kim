import { MeanTodoPage } from './app.po';

describe('mean-todo App', () => {
  let page: MeanTodoPage;

  beforeEach(() => {
    page = new MeanTodoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
