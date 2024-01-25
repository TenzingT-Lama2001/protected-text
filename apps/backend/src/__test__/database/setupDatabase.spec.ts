import mongoose from 'mongoose';
import setupDatabase from '@src/setupDatabase';

// Mock the mongoose.connect method
jest.mock('mongoose', () => ({
  set: jest.fn(),
  connection: {
    on: jest.fn(),
  },
  connect: jest.fn(),
}));

jest.mock('@logger/logger', () => {
  return {
    child: jest.fn(() => ({
      info: jest.fn(),
      error: jest.fn(),
    })),
  };
});

describe('setupDatabase', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should successfully connect to the database', async () => {
    (mongoose.connect as jest.Mock).mockResolvedValueOnce({});
    await setupDatabase();

    expect(mongoose.set).toHaveBeenCalledWith('strictQuery', false);
    expect(mongoose.connection.on).toHaveBeenCalledWith('disconnected', expect.any(Function));
    expect(mongoose.connect).toHaveBeenCalledWith('mongodb://localhost:27017/protected-text-test');
    // expect(infoLogger).toHaveBeenCalledWith('Successfully connected to database');
  });

  it('should handle database connection error', async () => {
    // Mock mongoose.connect to reject with an error
    (mongoose.connect as jest.Mock).mockRejectedValueOnce(new Error('Database connection error'));

    // Mock process.exit

    process.exit = jest.fn() as any;

    await setupDatabase();
    expect(mongoose.set).toHaveBeenCalledWith('strictQuery', false);
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
