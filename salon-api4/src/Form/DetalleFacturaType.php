<?php

namespace App\Form;

use App\Entity\DetalleFactura;
use App\Entity\Facturas;
use App\Entity\Servicios;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class DetalleFacturaType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('cantidad')
            ->add('precio')
            ->add('factura', EntityType::class, [
                'class' => Facturas::class,
                'choice_label' => 'id',
            ])
            ->add('servicio', EntityType::class, [
                'class' => Servicios::class,
                'choice_label' => 'id',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => DetalleFactura::class,
        ]);
    }
}
