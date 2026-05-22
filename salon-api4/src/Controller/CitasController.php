<?php

namespace App\Controller;

use App\Entity\Citas;
use App\Form\CitasType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/citas')]
final class CitasController extends AbstractController
{
    #[Route(name: 'app_citas_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $citas = $entityManager
            ->getRepository(Citas::class)
            ->findAll();

        return $this->render('citas/index.html.twig', [
            'citas' => $citas,
        ]);
    }

    #[Route('/new', name: 'app_citas_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $cita = new Citas();
        $form = $this->createForm(CitasType::class, $cita);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($cita);
            $entityManager->flush();

            return $this->redirectToRoute('app_citas_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('citas/new.html.twig', [
            'cita' => $cita,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_citas_show', methods: ['GET'])]
    public function show(Citas $cita): Response
    {
        return $this->render('citas/show.html.twig', [
            'cita' => $cita,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_citas_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Citas $cita, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(CitasType::class, $cita);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_citas_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('citas/edit.html.twig', [
            'cita' => $cita,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_citas_delete', methods: ['POST'])]
    public function delete(Request $request, Citas $cita, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$cita->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($cita);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_citas_index', [], Response::HTTP_SEE_OTHER);
    }
}
