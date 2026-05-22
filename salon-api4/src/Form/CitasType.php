<?php

namespace App\Form;

use App\Entity\Admin;
use App\Entity\Citas;
use App\Entity\Clientes;
use App\Entity\Servicios;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CitasType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('fecha_cita')
            ->add('hora_cita')
            ->add('estado')
            ->add('comentario')
            ->add('fecha_solicitud')
            ->add('cliente', EntityType::class, [
                'class' => Clientes::class,
                'choice_label' => 'id',
            ])
            ->add('admin', EntityType::class, [
                'class' => Admin::class,
                'choice_label' => 'id',
            ])
            ->add('servicios', EntityType::class, [
                'class' => Servicios::class,
                'choice_label' => 'id',
                'multiple' => true,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Citas::class,
        ]);
    }
}
