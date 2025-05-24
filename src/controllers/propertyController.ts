import { Request, Response } from 'express';
import prisma from '../db';

// Listar todas as propriedades
export const getAllProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const properties = await prisma.property.findMany();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar propriedades' });
  }
};

// Buscar propriedade por ID
export const getPropertyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: 'ID da propriedade é obrigatório' });
      return;
    }

    const property = await prisma.property.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        location: true,
        price: true,
        imageUrl: true,
        imageUrls: true,
        description: true,
        size: true,
        openArea: true,
        plantedArea: true,
        area_lavoura: true,
        isVerified: true,
        distance: true,
        soilType: true,
        features: true,
        cond_pag: true,
        status: true,
        camp_safra: true,
        camp_videos: true
      }
    });

    if (!property) {
      res.status(404).json({ error: 'Propriedade não encontrada' });
      return;
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar propriedade' });
  }
};

// Criar nova propriedade
export const createProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      price,
      location,
      size,
      openArea,
      plantedArea,
      area_lavoura,
      imageUrl,
      imageUrls,
      isVerified,
      distance,
      soilType,
      features,
      cond_pag,
      status,
      camp_safra,
      camp_videos
    } = req.body;

    if (!title || !price || !location || !size || !openArea || !imageUrl) {
      res.status(400).json({ error: 'Campos obrigatórios ausentes' });
      return;
    }

    const newProperty = await prisma.property.create({
      data: {
        title,
        description,
        price,
        location,
        size,
        openArea,
        plantedArea,
        area_lavoura,
        imageUrl,
        imageUrls,
        isVerified: isVerified ?? false,
        distance,
        soilType,
        features,
        cond_pag,
        status,
        camp_safra: camp_safra ?? false,
        camp_videos
      }
    });

    res.status(201).json(newProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar propriedade' });
  }
};

// Deletar propriedade por ID
export const deleteProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: 'ID da propriedade é obrigatório' });
      return;
    }

    const property = await prisma.property.findUnique({ where: { id } });

    if (!property) {
      res.status(404).json({ error: 'Propriedade não encontrada' });
      return;
    }

    await prisma.property.delete({ where: { id } });

    res.status(200).json({ message: 'Propriedade deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar propriedade' });
  }
};
