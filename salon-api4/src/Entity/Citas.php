<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ApiResource(
    normalizationContext: ['groups' => ['citas:read']],
    denormalizationContext: ['groups' => ['citas:write']]
)]
class Citas
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['citas:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Clientes::class, inversedBy: 'citas')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['citas:read', 'citas:write'])]
    private ?Clientes $cliente = null;

    #[ORM\ManyToOne(targetEntity: Admin::class, inversedBy: 'citas')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['citas:read', 'citas:write'])]
    private ?Admin $admin = null;

    #[ORM\Column(type: 'datetime')]
    #[Groups(['citas:read', 'citas:write'])]
    private ?\DateTime $fecha_cita = null;

    #[ORM\Column(type: 'time')]
    #[Groups(['citas:read', 'citas:write'])]
    private ?\DateTime $hora_cita = null;

    #[ORM\Column(length: 50)]
    #[Groups(['citas:read', 'citas:write'])]
    private ?string $estado = null;

    #[ORM\Column(type: 'text', nullable: true)]
    #[Groups(['citas:read', 'citas:write'])]
    private ?string $comentario = null;

    #[ORM\Column(type: 'datetime')]
    #[Groups(['citas:read', 'citas:write'])]
    private ?\DateTime $fecha_solicitud = null;

    #[ORM\ManyToMany(targetEntity: Servicios::class)]
    #[ORM\JoinTable(name: 'cita_servicio')]
    #[Groups(['citas:read', 'citas:write'])]
    private Collection $servicios;

    public function __construct()
    {
        $this->servicios = new ArrayCollection();
    }

    // ---------- Getters & Setters ----------
    public function getId(): ?int
    {
        return $this->id;
    }
    public function getCliente(): ?Clientes
    {
        return $this->cliente;
    }
    public function setCliente(?Clientes $cliente): static
    {
        $this->cliente = $cliente;
        return $this;
    }
    public function getAdmin(): ?Admin
    {
        return $this->admin;
    }
    public function setAdmin(?Admin $admin): static
    {
        $this->admin = $admin;
        return $this;
    }
    public function getFechaCita(): ?\DateTime
    {
        return $this->fecha_cita;
    }
    public function setFechaCita(\DateTime $fecha): static
    {
        $this->fecha_cita = $fecha;
        return $this;
    }
    public function getHoraCita(): ?\DateTime
    {
        return $this->hora_cita;
    }
    public function setHoraCita(\DateTime $hora): static
    {
        $this->hora_cita = $hora;
        return $this;
    }
    public function getEstado(): ?string
    {
        return $this->estado;
    }
    public function setEstado(string $estado): static
    {
        $this->estado = $estado;
        return $this;
    }
    public function getComentario(): ?string
    {
        return $this->comentario;
    }
    public function setComentario(?string $comentario): static
    {
        $this->comentario = $comentario;
        return $this;
    }
    public function getFechaSolicitud(): ?\DateTime
    {
        return $this->fecha_solicitud;
    }
    public function setFechaSolicitud(\DateTime $fecha): static
    {
        $this->fecha_solicitud = $fecha;
        return $this;
    }

    /** @return Collection|Servicios[] */
    public function getServicios(): Collection
    {
        return $this->servicios;
    }
    public function addServicio(Servicios $servicio): static
    {
        if (!$this->servicios->contains($servicio)) {
            $this->servicios->add($servicio);
        }
        return $this;
    }
    public function removeServicio(Servicios $servicio): static
    {
        $this->servicios->removeElement($servicio);
        return $this;
    }
}
