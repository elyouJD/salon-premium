<?php

namespace App\Form;

use App\Entity\Admin;
use App\Entity\Clientes;
use App\Entity\Facturas;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class FacturasType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('codigo_factura')
            ->add('fecha_factura')
            ->add('cliente', EntityType::class, [
                'class' => Clientes::class,
                'choice_label' => 'id',
            ])
            ->add('admin', EntityType::class, [
                'class' => Admin::class,
                'choice_label' => 'id',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Facturas::class,
        ]);
    }
}
