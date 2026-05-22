<?php

namespace App\Controller;

use App\Entity\Servicios;
use App\Form\ServiciosType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/servicios')]
final class ServiciosController extends AbstractController
{
    #[Route(name: 'app_servicios_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $servicios = $entityManager
            ->getRepository(Servicios::class)
            ->findAll();

        return $this->render('servicios/index.html.twig', [
            'servicios' => $servicios,
        ]);
    }

    #[Route('/new', name: 'app_servicios_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $servicio = new Servicios();
        $form = $this->createForm(ServiciosType::class, $servicio);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($servicio);
            $entityManager->flush();

            return $this->redirectToRoute('app_servicios_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('servicios/new.html.twig', [
            'servicio' => $servicio,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_servicios_show', methods: ['GET'])]
    public function show(Servicios $servicio): Response
    {
        return $this->render('servicios/show.html.twig', [
            'servicio' => $servicio,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_servicios_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Servicios $servicio, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(ServiciosType::class, $servicio);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_servicios_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('servicios/edit.html.twig', [
            'servicio' => $servicio,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_servicios_delete', methods: ['POST'])]
    public function delete(Request $request, Servicios $servicio, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$servicio->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($servicio);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_servicios_index', [], Response::HTTP_SEE_OTHER);
    }
}
