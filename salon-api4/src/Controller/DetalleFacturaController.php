<?php

namespace App\Controller;

use App\Entity\DetalleFactura;
use App\Form\DetalleFacturaType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/detalle/factura')]
final class DetalleFacturaController extends AbstractController
{
    #[Route(name: 'app_detalle_factura_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $detalleFacturas = $entityManager
            ->getRepository(DetalleFactura::class)
            ->findAll();

        return $this->render('detalle_factura/index.html.twig', [
            'detalle_facturas' => $detalleFacturas,
        ]);
    }

    #[Route('/new', name: 'app_detalle_factura_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $detalleFactura = new DetalleFactura();
        $form = $this->createForm(DetalleFacturaType::class, $detalleFactura);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($detalleFactura);
            $entityManager->flush();

            return $this->redirectToRoute('app_detalle_factura_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('detalle_factura/new.html.twig', [
            'detalle_factura' => $detalleFactura,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_detalle_factura_show', methods: ['GET'])]
    public function show(DetalleFactura $detalleFactura): Response
    {
        return $this->render('detalle_factura/show.html.twig', [
            'detalle_factura' => $detalleFactura,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_detalle_factura_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, DetalleFactura $detalleFactura, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(DetalleFacturaType::class, $detalleFactura);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_detalle_factura_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('detalle_factura/edit.html.twig', [
            'detalle_factura' => $detalleFactura,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_detalle_factura_delete', methods: ['POST'])]
    public function delete(Request $request, DetalleFactura $detalleFactura, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$detalleFactura->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($detalleFactura);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_detalle_factura_index', [], Response::HTTP_SEE_OTHER);
    }
}
