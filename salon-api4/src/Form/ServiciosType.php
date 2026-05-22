<?php

namespace App\Form;

use App\Entity\Admin;
use App\Entity\Servicios;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ServiciosType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nombre_servicio')
            ->add('descripcion')
            ->add('costo')
            ->add('fecha_creacion')
            ->add('admin', EntityType::class, [
                'class' => Admin::class,
                'choice_label' => 'id',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Servicios::class,
        ]);
    }
}
