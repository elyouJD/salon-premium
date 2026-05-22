<?php

namespace App\Controller\Api;

use App\Entity\Clientes;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/clientes')]
class ClientesController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $clientes = $em->getRepository(Clientes::class)->findAll();

        $data = array_map(fn($c) => [
            'id' => $c->getId(),
            'nombre' => $c->getNombre(),
            'email' => $c->getEmail(),
            'telefono' => $c->getTelefono(),
        ], $clientes);

        return $this->json($data);
    }

    #[Route('', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $cliente = new Clientes();
        $cliente->setNombre($data['nombre']);
        $cliente->setEmail($data['email']);
        $cliente->setTelefono($data['telefono']);

        // مهم باش ما يبقاش 500
        $cliente->setGenero($data['genero'] ?? 'M');
        $cliente->setDetalles($data['detalles'] ?? '');
        $cliente->setFechaCreacion(new \DateTime());
        $cliente->setFechaActualizacion(new \DateTime());

        $em->persist($cliente);
        $em->flush();

        return $this->json(['message' => 'created'], 201);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(?Clientes $cliente, EntityManagerInterface $em): JsonResponse
    {
        if (!$cliente) {
            return $this->json(['error' => 'not found'], 404);
        }

        $em->remove($cliente);
        $em->flush();

        return $this->json(['message' => 'deleted']);
    }
}
