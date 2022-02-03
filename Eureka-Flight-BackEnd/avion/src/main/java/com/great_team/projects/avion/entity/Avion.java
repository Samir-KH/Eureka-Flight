package com.great_team.projects.avion.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class Avion {
	@Id
	
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE
        )
	Long numAvion;
	String nomAvion;
	String marque;
	Integer capacite;
	String ville;
	
	public Avion() {
		// TODO Auto-generated constructor stub
	}
	
	public Avion(Long numAvion, String nomAvion, String marque, Integer capacite, String ville) {
		this.numAvion = numAvion;
		this.nomAvion = nomAvion;
		this.marque = marque;
		this.capacite = capacite;
		this.ville = ville;
	}
	public Long getNumAvion() {
		return numAvion;
	}
	public void setNumAvion(Long numAvion) {
		this.numAvion = numAvion;
	}
	public String getNomAvion() {
		return nomAvion;
	}
	public void setNomAvion(String nomAvion) {
		this.nomAvion = nomAvion;
	}
	public String getMarque() {
		return marque;
	}
	public void setMarque(String marque) {
		this.marque = marque;
	}
	public Integer getCapacite() {
		return capacite;
	}
	public void setCapacite(Integer capacite) {
		this.capacite = capacite;
	}
	public String getVille() {
		return ville;
	}
	public void setVille(String ville) {
		this.ville = ville;
	}
	@Override
	public String toString() {
		return "Avion {"
				+ "numAvion:" + numAvion + ", nomAvion:" + nomAvion + ", marque:" + marque + ", capacite:"
				+ capacite + ", ville:" + ville + "}";
	}
	
	
	
}
