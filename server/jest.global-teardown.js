// export default async () => {
//   const collections = Object.keys(mongoose.connection.collections);
//   for (let collectionName of collections) {
//     const collection = mongoose.connection.collections[collectionName];
//     await collection.deleteMany();
//   }
// }