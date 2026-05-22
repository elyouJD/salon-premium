<?php

namespace App\Controller;

use App\Entity\Facturas;
use App\Form\FacturasType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/facturas')]
final class FacturasController extends AbstractController
{
    #[Route(name: 'app_facturas_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $facturas = $entityManager
            ->getRepository(Facturas::class)
            ->findAll();

        return $this->render('facturas/index.html.twig', [
            'facturas' => $facturas,
        ]);
    }

    #[Route('/new', name: 'app_facturas_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $factura = new Facturas();
        $form = $this->createForm(FacturasType::class, $factura);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($factura);
            $entityManager->flush();

            return $this->redirectToRoute('app_facturas_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('facturas/new.html.twig', [
            'factura' => $factura,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_facturas_show', methods: ['GET'])]
    public function show(Facturas $factura): Response
    {
        return $this->render('facturas/show.html.twig', [
            'factura' => $factura,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_facturas_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Facturas $factura, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(FacturasType::class, $factura);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_facturas_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('facturas/edit.html.twig', [
            'factura' => $factura,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_facturas_delete', methods: ['POST'])]
    public function delete(Request $request, Facturas $factura, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$factura->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($factura);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_facturas_index', [], Response::HTTP_SEE_OTHER);
    }
}
