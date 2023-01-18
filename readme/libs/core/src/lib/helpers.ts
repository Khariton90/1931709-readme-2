import { CommandEvent } from '@readme/shared-types';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { genSalt, hash } from 'bcrypt';
 
export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true })
}

export function getMongoConnectionString({ username, password, host, port, databaseName, authDatabase }): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function createEvent(commandEvent: CommandEvent) {
  return { cmd: commandEvent };
}

export async function changePassword(password: string, saltRounds: number): Promise<string> {
  const salt = await genSalt(saltRounds);
  const passwordHash = await hash(password, salt);
  return passwordHash;
} 