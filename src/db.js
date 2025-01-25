import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://cristianluceroala2:qFucAE4LA2fIFpQv@cluster0.gyxeu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('<<<Base de Datos Conectada>>>');
  } catch (error) {
    console.log('Error al intentar conectar a Base de Datos')
  }
}

