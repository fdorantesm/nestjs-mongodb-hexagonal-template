import { ProfileEntity } from './profile.entity';

describe('ProfileEntity', () => {
  it('should create a profile entity', () => {
    const profile = {
      name: 'John Doe',
      phone: '1234567890',
    };

    const profileEntity = ProfileEntity.create(profile);

    expect(profileEntity.name).toEqual(profile.name);
    expect(profileEntity.phone).toEqual(profile.phone);
  });

  it('should convert profile entity to object', () => {
    const profile = {
      name: 'John Doe',
      phone: '1234567890',
    };

    const profileEntity = ProfileEntity.create(profile);
    const profileObject = profileEntity.toObject();

    expect(profileObject.name).toEqual(profile.name);
    expect(profileObject.phone).toEqual(profile.phone);
  });

  it('should convert profile entity to JSON', () => {
    const profile = {
      name: 'John Doe',
      phone: '1234567890',
    };

    const profileEntity = ProfileEntity.create(profile);
    const profileJson = profileEntity.toJson();

    expect(profileJson.name).toEqual(profile.name);
    expect(profileJson.phone).toEqual(profile.phone);
  });
});
