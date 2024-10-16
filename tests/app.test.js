const { beforeEach } = require('node:test');
const { getBooks, getBookById } = require('../controllers');
let { app } = require('../index.js');

let http = require('http');
let request = require('supertest');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getBooks: jest.fn(),
  getBookById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('API endpints testing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should get all books', async () => {
    let mockData = [
      {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
      {
        bookId: 2,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
      },
      {
        bookId: 3,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic',
      },
    ];
    getBooks.mockReturnValue(mockData);
    let result = await request(server).get('/books');
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(mockData);
    expect(result.body.length).toBe(3);
  });

  it('should get book by id', async () => {
    let mockData = {
      bookId: 3,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic',
    };
    getBookById.mockReturnValue(mockData);
    let result = await request(server).get('/books/details/3');
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(mockData);
  });
});

describe('function mock testing', () => {
  it('getBooks should get all books', async () => {
    let mockData = [
      {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
      {
        bookId: 2,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
      },
      {
        bookId: 3,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic',
      },
    ];
    getBooks.mockReturnValue(mockData);
    let result = await getBooks();
    expect(result).toEqual(mockData);
  });
});
