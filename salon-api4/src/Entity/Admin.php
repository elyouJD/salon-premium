<?php

namespace App\Entity;

use App\Repository\AdminRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AdminRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['admin:read']],
    denormalizationContext: ['groups' => ['admin:write']]
)]
class Admin
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['admin:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['admin:read', 'admin:write'])]
    private ?string $nombre = null;

    #[ORM\Column(length: 255)]
    #[Groups(['admin:read', 'admin:write'])]
    private ?string $usuario = null;

    #[ORM\Column(length: 20)]
    #[Groups(['admin:read', 'admin:write'])]
    private ?string $telefono = null;

    #[ORM\Column(length: 255)]
    #[Groups(['admin:read', 'admin:write'])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Groups(['admin:write'])]
    private ?string $password = null;

    #[ORM\Column]
    #[Groups(['admin:read', 'admin:write'])]
    private ?\DateTime $fecha_registro = null;

    // ---------- Relations ----------
    #[ORM\OneToMany(mappedBy: 'admin', targetEntity: Servicios::class)]
    #[Groups(['admin:read'])]
    private Collection $servicios;

    #[ORM\OneToMany(mappedBy: 'admin', targetEntity: Citas::class)]
    #[Groups(['admin:read'])]
    private Collection $citas;

    #[ORM\OneToMany(mappedBy: 'admin', targetEntity: Facturas::class)]
    #[Groups(['admin:read'])]
    private Collection $facturas;

    public function __construct()
    {
        $this->servicios = new ArrayCollection();
        $this->citas = new ArrayCollection();
        $this->facturas = new ArrayCollection();
    }

    // ---------- Getters & Setters ----------
    public function getId(): ?int
    {
        return $this->id;
    }
    public function getNombre(): ?string
    {
        return $this->nombre;
    }
    public function setNombre(string $nombre): static
    {
        $this->nombre = $nombre;
        return $this;
    }
    public function getUsuario(): ?string
    {
        return $this->usuario;
    }
    public function setUsuario(string $usuario): static
    {
        $this->usuario = $usuario;
        return $this;
    }
    public function getTelefono(): ?string
    {
        return $this->telefono;
    }
    public function setTelefono(string $telefono): static
    {
        $this->telefono = $telefono;
        return $this;
    }
    public function getEmail(): ?string
    {
        return $this->email;
    }
    public function setEmail(string $email): static
    {
        $this->email = $email;
        return $this;
    }
    public function getPassword(): ?string
    {
        return $this->password;
    }
    public function setPassword(string $password): static
    {
        $this->password = password_hash($password, PASSWORD_BCRYPT);

        return $this;
    }
    public function getFechaRegistro(): ?\DateTime
    {
        return $this->fecha_registro;
    }
    public function setFechaRegistro(\DateTime $fecha_registro): static
    {
        $this->fecha_registro = $fecha_registro;
        return $this;
    }

    // ---------- Collections ----------
    /** @return Collection|Servicios[] */
    public function getServicios(): Collection
    {
        return $this->servicios;
    }
    public function addServicio(Servicios $servicio): static
    {
        if (!$this->servicios->contains($servicio)) {
            $this->servicios->add($servicio);
            $servicio->setAdmin($this);
        }
        return $this;
    }
    public function removeServicio(Servicios $servicio): static
    {
        if ($this->servicios->removeElement($servicio) && $servicio->getAdmin() === $this) {
            $servicio->setAdmin(null);
        }
        return $this;
    }

    /** @return Collection|Citas[] */
    public function getCitas(): Collection
    {
        return $this->citas;
    }
    public function addCita(Citas $cita): static
    {
        if (!$this->citas->contains($cita)) {
            $this->citas->add($cita);
            $cita->setAdmin($this);
        }
        return $this;
    }
    public function removeCita(Citas $cita): static
    {
        if ($this->citas->removeElement($cita) && $cita->getAdmin() === $this) {
            $cita->setAdmin(null);
        }
        return $this;
    }

    /** @return Collection|Facturas[] */
    public function getFacturas(): Collection
    {
        return $this->facturas;
    }
    public function addFactura(Facturas $factura): static
    {
        if (!$this->facturas->contains($factura)) {
            $this->facturas->add($factura);
            $factura->setAdmin($this);
        }
        return $this;
    }
    public function removeFactura(Facturas $factura): static
    {
        if ($this->facturas->removeElement($factura) && $factura->getAdmin() === $this) {
            $factura->setAdmin(null);
        }
        return $this;
    }
}
