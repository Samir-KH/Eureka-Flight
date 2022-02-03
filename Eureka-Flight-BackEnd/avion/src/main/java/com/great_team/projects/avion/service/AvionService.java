package com.great_team.projects.avion.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.great_team.projects.avion.entity.Avion;
import com.great_team.projects.avion.repository.AvionRepository;

@Service
public class AvionService {
	
	AvionRepository avionRepository;
	
	@Autowired
	public AvionService(AvionRepository avionRepository) {
		this.avionRepository = avionRepository;
	}
	
	public List<Avion> getAvionList(){
		return this.avionRepository.findAll();
	}

	public Optional<Avion> getAvionById(Long id) {
		return this.avionRepository.findById(id);
	}

	public String save(Avion avion) {
		avion.setNumAvion(null);
		String name = avion.getNomAvion();
		Integer capacite = avion.getCapacite();
		String ville = avion.getVille();
		String marque = avion.getMarque();
		if(name == null || capacite == null || ville == null || marque == null ) {
			throw new IllegalStateException("les champs de l'entité avion sont null");
		}
		if(name.equals("") || ville.equals("")  || marque.equals("") ) {
			throw new IllegalStateException("les champs de l'entité avion sont null");
		}
		Optional<Avion> result = this.avionRepository.getAvion(name,marque, capacite, ville);
		if(result.isEmpty()) {
			this.avionRepository.save(avion);
			return "success";
		}
		else {
			throw new IllegalStateException("l'avion fournit existe déjà");
		}
	}
	public String upDate(Avion avion) {
		if(avion.getNumAvion() == null ) {
			throw new IllegalStateException("absence de numero d'avion");
		}
		String name = avion.getNomAvion();
		Integer capacite = avion.getCapacite();
		String ville = avion.getVille();
		String marque = avion.getMarque();
		if(name == null || capacite == null || ville == null || marque == null ) {
			throw new IllegalStateException("les champs de l'entité avion sont null");
		}
		if(name.equals("") || ville.equals("")  || marque.equals("") ) {
			throw new IllegalStateException("les champs de l'entité avion sont null");
		}
		ArrayList<Avion> result = this.avionRepository.getOtherAvion(name,marque, capacite, ville,avion.getNumAvion());
		if(result.isEmpty()) {
			this.avionRepository.save(avion);
			return "success";
		}
		else {
			throw new IllegalStateException("l'avion fournit existe déjà");
		}
	}
	public ArrayList<Avion> getAvailabaleAvion(){
		return this.avionRepository.getAvailabaleAvion();	
	}
	public String delete(Long id) {
		this.avionRepository.deleteById(id);
		return "success";
	}

	public String getAvionInfoById(Long id, String info) {
		// TODO Auto-generated method stub
		Optional<Avion> result =  this.avionRepository.findById(id) ;
		
		if(result.isEmpty())
			return "does not exist";
		else {
			if (info.equals("name")) {
				return result.get().getNomAvion();
			}
			return "info tyepe does not exist";
		}
	}
}
